'use client';

import { Button } from "@/components/ui/button";
import { useGetCallById } from "@/hooks/getCallById";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const PersonalRoom = () => {
  const { isLoaded, user } = useUser();
  const meetingId = user?.id; // ✅ this should be something real, like the Clerk user ID
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;
  const { call } = useGetCallById(meetingId!);
  const router = useRouter();
  const client = useStreamVideoClient();

  const startRoom = async () => {
    if (!client || !user) return;

    if (!call) {
      const newCall = client.call("default", meetingId!);
      await newCall.getOrCreate({
        data: { starts_at: new Date().toISOString() },
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  };

  if (!isLoaded || !user) return <p>Loading...</p>;

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">Personal Room</h1>

      <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
        <div className="flex flex-col xl:flex-row items-start gap-2">
          <h1 className="text-base font-medium text-sky-1 lg:text-xl xl:min-w-32">Meeting ID:</h1>
          <h1 className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl">{meetingId}</h1>
        </div>

        <div className="flex flex-col xl:flex-row items-start gap-2">
          <h1 className="text-base font-medium text-sky-1 lg:text-xl xl:min-w-32">Invite Link:</h1>
          <h1 className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl">{meetingLink}</h1>
        </div>
      </div>

      <div className="flex gap-5">
        <Button className="bg-blue-1" onClick={startRoom}>
          Start Meeting
        </Button>
        <Button
          className="bg-dark-1"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast("Link Copied");
          }}
        >
          Copy Invitation
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoom;
