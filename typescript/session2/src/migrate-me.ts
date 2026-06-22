//import { EventEmitter } from "events";

interface User {
  id: string;
  name: string;
}

const cache: Record<string, User> = {};

function fetchUserFromCache(
  id: string
): User | null {

  return cache[id] ?? null;

}

function saveUserToCache(
  user: User
): void {

  cache[user.id] = user;

}

function processUsers<T, U>(
  users: T[],
  filterFn: (user: T) => boolean,
  transformFn: (user: T) => U
): U[] {

  return users
    .filter(filterFn)
    .map(transformFn);

}

function buildQueryString(
  params: Record<string, string | number | boolean>
): string {

  return Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(String(params[key]))}`)
    .join("&");

}

function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number,
  delay: number
): Promise<T> {

  return new Promise((resolve, reject) => {

    let attempt = 0;

    function run() {

      attempt++;

      fn()
        .then(resolve)
        .catch(error => {

          if (attempt >= maxAttempts) {

            reject(error);

          } else {

            setTimeout(run, delay);

          }

        });

    }

    run();

  });

}

export {
  fetchUserFromCache,
  saveUserToCache,
  processUsers,
  buildQueryString,
  retry
};