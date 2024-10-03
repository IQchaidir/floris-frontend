export function LoginRoute() {
    return (
        <main className="px-44 py-10 flex gap-8 justify-between">
            <div className="w-1/2 border rounded-md p-5 flex flex-col space-y-2 ">
                <p className="text-4xl font-bold">LOGIN</p>
                <p className="text-xl">Login with your email address and password</p>
                <form className="flex flex-col pt-10 justify-between flex-1">
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="email" className="text-3xl font-semibold">
                                EMAIL ADDRESS
                            </label>
                            <input type="text" name="email" className="border rounded-md text-3xl" />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="password" className="text-3xl font-semibold">
                                Password
                            </label>
                            <input type="text" name="password" className="border rounded-md text-3xl" />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <button
                            type="submit"
                            className="bg-[#F8BA8C] text-3xl text-[#00634B] py-2 rounded-md font-semibold"
                        >
                            Sign in
                        </button>
                        <button
                            type="button"
                            className="bg-[#00634B] text-3xl text-[white] py-2 rounded-md font-semibold"
                        >
                            Create an account
                        </button>
                    </div>
                </form>
            </div>
            <div className="w-1/2">
                <img src="/public/login.jpg" width={625} height={625} className="bg-cover rounded-md" />
            </div>
        </main>
    )
}
