import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function Home() {
  const { user } = useUser();
  const [phone, setPhone] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      fetch("/api/phone")
        .then((res) => res.json())
        .then((data) => setPhone(data.phone));
    }
  }, [user]);

  const savePhone = async () => {
    await fetch("/api/phone", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <main style={{ padding: 40, fontFamily: "sans-serif" }}>
      <SignedOut>
        <h1>Welcome! Please sign in</h1>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
        <h1>Your Phone Number</h1>
        <input
          type="text"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="Enter phone number"
        />
        <button onClick={savePhone} style={{ marginLeft: 10 }}>Save</button>
        {saved && <span style={{ marginLeft: 10, color: "green" }}>Saved!</span>}
      </SignedIn>
    </main>
  );
}
