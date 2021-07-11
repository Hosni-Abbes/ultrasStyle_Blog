export function Logout() {
  //empty session storage and clear session
  sessionStorage.setItem('userData', '');
  sessionStorage.clear();
  //redirect user to blog page
  setTimeout(()=> window.location.reload());
}