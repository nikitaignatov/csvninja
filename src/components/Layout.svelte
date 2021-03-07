<div
    class="min-h-screen min-w-full bg-gray-100 flex flex-col justify-center p-10"
>
    <div
        class="relative w-full max-w-full lg:max-w-6xl xl:max-w-screen-2xl mx-auto"
    >
        <div
            class="absolute inset-0 -mr-3.5 bg-gradient-to-r from-blue-100 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:rotate-3 sm:rounded-3xl"
        />
        <div class="relative bg-white shadow-lg sm:rounded-3xl">
            <div class="flex items-center justify-start pt-6 pl-6">
                <span class="w-3 h-3 bg-red-400 rounded-full mr-2" />
                <span class="w-3 h-3 bg-yellow-400 rounded-full mr-2" />
                <span class="w-3 h-3 bg-green-400 rounded-full mr-2" />
            </div>

            <div class="px-20 py-6">
                <slot />
            </div>
        </div>
    </div>
</div>
