import { redirect } from "next/navigation";
import signInImage from "../../../public/images/9.jpg";
import { signIn, providerMap, auth } from "../../../auth";
import { AuthError } from "next-auth";
import Image from "next/image";
import ColorButton from "@/components/ui/ColorButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign up or Login to Eunstagram",
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const session = await auth();
  const user = session?.user;
  if (user) {
    redirect("/");
  }
  const redirectTo = searchParams.callbackUrl;
  return (
    <section className="w-full mt-[16px] pb-[16px]">
      <div className="min-w-[400px] flex flex-col h-full bg-white w-1/3 mx-auto rounded-2xl">
        <Image
          className="my-[240px] mx-auto pb-[60px] bg-cover"
          alt="signInImage"
          src={signInImage}
          width={80}
          height={80}
        />
        {Object.values(providerMap).map((provider) => (
          <form
            key={""}
            className="mx-auto cursor-pointer pb-[56px]"
            action={async () => {
              "use server";
              try {
                await signIn(provider.id, {
                  redirectTo: redirectTo,
                });
              } catch (error) {
                if (error instanceof AuthError) {
                  throw error;
                  // return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
                }
                throw error;
              }
            }}
          >
            <ColorButton
              className="min-w-[240px] flex-none text-[15px] font-[400] bg-white rounded-[0.275rem] p-[0.3rem] hover:opacity-90 transition-opacity"
              type={"submit"}
              text={`Sign in with ${provider.name}`}
            />
          </form>
        ))}
      </div>
    </section>
  );
}
