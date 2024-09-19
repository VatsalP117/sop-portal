import { Button } from "@/components/ui/button";
export default function Logout() {
  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={() =>
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
          method: "GET",
          credentials: "same-origin",
          withCredentials: true,
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.redirectUrl) {
              window.location.href = data.redirectUrl;
            } else {
              window.location.href = "/";
            }
          })
      }
    >
      Logout
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-log-out mx-1"
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" x2="9" y1="12" y2="12" />
      </svg>
    </Button>
  );
}
