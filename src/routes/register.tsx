import { ActionFunctionArgs, Form, redirect, useActionData } from "react-router-dom"
import { auth } from "../libs/auth"
import { UserRegisterSchema } from "../schemas/user"

type ActionData = {
    errors?: {
        username?: string[]
        email?: string[]
        password?: string[]
    }
}

export async function loader() {
    const user = await auth.checkUser()
    if (user) return redirect("/")
    return null
}

export function RegisterRoute() {
    const actionData = useActionData() as ActionData | undefined

    return (
        <main className="px-44 py-10 flex gap-8 justify-between">
            <div className="w-1/2 border rounded-md p-5 flex flex-col space-y-2">
                <p className="text-4xl font-bold">Create an account</p>
                <Form method="post" className="flex flex-col pt-10 justify-between flex-1">
                    <div className="space-y-3">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="username" className="text-3xl font-semibold">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                name="username"
                                required
                                className="border rounded-md text-3xl py-1 px-2"
                            />
                            <p className="min-h-4 text-red-500 text-xs">
                                {actionData?.errors?.username ? actionData.errors.username[0] : ""}
                            </p>
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label htmlFor="email" className="text-3xl font-semibold">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                required
                                className="border rounded-md text-3xl py-1 px-2"
                            />
                            <p className="min-h-4 text-red-500 text-xs">
                                {actionData?.errors?.email ? actionData.errors.email[0] : ""}
                            </p>
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label htmlFor="password" className="text-3xl font-semibold">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                required
                                className="border rounded-md text-3xl py-1 px-2"
                            />
                            <p className="min-h-4 text-red-500 text-xs">
                                {actionData?.errors?.password ? actionData.errors.password[0] : ""}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <button
                            type="submit"
                            className="bg-[#F8BA8C] text-3xl text-[#00634B] py-2 rounded-md font-semibold"
                        >
                            Register
                        </button>
                    </div>
                </Form>
            </div>
            <div className="w-1/2">
                <img src="/login.jpg" width={625} height={625} className="bg-cover rounded-md" />
            </div>
        </main>
    )
}

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData()

    const userRegister = {
        username: String(formData.get("username")),
        email: String(formData.get("email")),
        password: String(formData.get("password")),
    }

    const validationResult = UserRegisterSchema.safeParse(userRegister)

    if (!validationResult.success) {
        const errors = validationResult.error.flatten().fieldErrors
        return { errors }
    }

    const result = await auth.register(userRegister)

    if (!result) {
        return { error: "Failed to register user." }
    }

    return redirect("/login")
}
