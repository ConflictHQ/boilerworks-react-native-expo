import { ApolloClient, HttpLink, InMemoryCache, Observable, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

import { apiClient } from '@/api/client';
import { authStorage } from '@/storage/authStorage';
import { env } from '@/constants/env';

interface CreateApolloClientOptions {
  /** Called when the server returns an UNAUTHENTICATED error and token refresh also fails. */
  onSessionExpired: () => void;
}

export function createApolloClient({ onSessionExpired }: CreateApolloClientOptions): ApolloClient<unknown> {
  // Injects Bearer token from storage on every request.
  // Token is kept fresh by apiClient's proactive/reactive refresh interceptors —
  // Apollo reads whatever is current in SecureStore and never refreshes itself.
  const authLink = setContext(async (_, { headers }) => {
    const jwt = await authStorage.getJwt();
    return {
      headers: {
        ...headers,
        ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
      },
    };
  });

  // On UNAUTHENTICATED, attempts one token refresh via apiClient.bootstrapToken() before
  // giving up. The `retried` context flag prevents infinite retry loops.
  const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    const isUnauthenticated =
      graphQLErrors?.some(e => e.extensions?.code === 'UNAUTHENTICATED') ||
      (networkError && 'statusCode' in networkError && networkError.statusCode === 401);

    if (!isUnauthenticated) return;

    // Already retried once — the session is truly dead.
    if (operation.getContext().retried) {
      onSessionExpired();
      return;
    }

    return new Observable(observer => {
      authStorage.getJwt().then(async currentJwt => {
        if (!currentJwt) {
          onSessionExpired();
          observer.complete();
          return;
        }

        const newJwt = await apiClient.bootstrapToken(currentJwt);
        if (!newJwt) {
          onSessionExpired();
          observer.complete();
          return;
        }

        // Token refreshed — mark as retried and replay the original operation.
        // authLink will pick up the new token from SecureStore automatically.
        operation.setContext({ retried: true });
        forward(operation).subscribe(observer);
      }).catch(() => {
        onSessionExpired();
        observer.complete();
      });
    });
  });

  const httpLink = new HttpLink({ uri: env.GRAPHQL_URL });

  return new ApolloClient({
    link: from([authLink, errorLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: { fetchPolicy: 'cache-and-network' },
    },
  });
}