import { SignIn, SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <section className="">
      <div className="">
        <main className="flex items-center justify-center px-8 py-8 bg-gray-900 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <SignIn />
        </main>
      </div>
    </section>
  );
}
