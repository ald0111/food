export default function Logout() {
  const logout = () => {
    localStorage.clear();
  };
  return <button onClick={logout}>Logout</button>;
}
