import { create } from 'zustand'

interface User {

    id: number,
    name: string,
    email: string

}

interface UserStore {
    user: User | null,
    update: (user: User) => void
}

export const useUserStore = create<UserStore>
    (
        (set) => (
            {
                user: null,
                update: (user) =>
                    set(
                        () => ({ user })
                    )
            }
        )

    )


