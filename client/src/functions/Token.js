export default function tokenExists() {
  return localStorage.token && localStorage.name ? true : false;
}
