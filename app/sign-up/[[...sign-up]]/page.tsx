import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#0B0F19]">
            <SignUp appearance={{
                elements: {
                    formButtonPrimary: 'bg-indigo-600 hover:bg-indigo-500',
                    footerActionLink: 'text-indigo-400 hover:text-indigo-300'
                }
            }} />
        </div>
    );
}