export function SiteFooter() {
    return (
        <footer className="flex flex-col gap-3 justify-center items-center bg-[#00634B] py-2">
            <div className="flex gap-3 items-center">
                <img src="/logo.png" className="w-7 h-10" />
                <div className="text-white font-bold text-4xl">FLORIS</div>
            </div>
            <div className="text-white">Copyright © 2024 Floris by Iqbal Chaidir</div>
        </footer>
    )
}
