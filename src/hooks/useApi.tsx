import moment from 'moment';
import React, { createContext, ReactNode, useContext } from 'react';
import { Activity, CreateActivityForm, CreateTaskForm, Task, Test, UpdateActivityForm, UpdateTaskForm, User } from '../types/entities';
import { Page } from '../types/types';
import { conf } from './../conf'

export interface ApiContext {
    login: (user: string, password: string) => void
    logout: () => void
    fakeDelay: (delay: number) => void
    getUserInfo: () => Promise<User>
    createActivity: (activity: CreateActivityForm) => Promise<void>
    updateActivity: (activity: UpdateActivityForm) => Promise<void>
    getActivity: (id: string) => Promise<Activity>
    getActivities: (page: number, search: string) => Promise<Page<Activity>>
    deleteActivity: (id: string) => Promise<void>
    createTask: (task: CreateTaskForm) => Promise<void>
    updateTask: (task: UpdateTaskForm) => Promise<void>
    deleteTask: (id: string) => Promise<void>
    getUserTasks: (userId: string, startDate: Date) => Promise<Task[]>
}

const ApiContext = createContext<ApiContext>({} as any)

export const useApi = () => {
    const ctx = useContext(ApiContext)
    if (ctx === null) {
        throw new Error('useApi() can only be used on the descendants of ApiProvider')
    } else {
        return ctx
    }
}



export const ApiProvider = ({ children }: { children: ReactNode }) => {

    function fakeDelay(delay: number) {
        return new Promise(res => setTimeout(res, delay));
    }

    const login = async (user: string, password: string) => {
        const url = `${conf.mainApiUrl}public/user?user=${user}&password=${password}`
        // const options: RequestInit = {
        //     credentials: 'include',
        //     method: 'POST',
        //     headers: new Headers({
        //         'content-type': 'application/json',
        //     })
        // }
        // let result = []
        // try {
        //     const res = await fetch(url, options)
        //     if (!res.ok) {
        //         throw new Error(JSON.stringify(res))
        //     }
        //     const resObject = await res.json()
        //     result = resObject
        // } catch (e) {
        //     throw Error('Error al realizar el login')
        // }
    }

    const logout = async () => {
        const url = `${conf.mainApiUrl}public/user/logout`
        // const options: RequestInit = {
        //     credentials: 'include',
        //     method: 'POST',
        //     headers: new Headers({
        //         'content-type': 'application/json',
        //     })
        // }
        // try {
        //     const res = await fetch(url, options)
        //     if (!res.ok) {
        //         throw new Error(JSON.stringify(res))
        //     }
        // } catch (e) {
        //     throw Error('Error al cerrar sesión')
        // }
    }

    const getUserInfo = async (): Promise<User> => {
        const url = `${conf.mainApiUrl}public/myuser`
        // const options: RequestInit = {
        //     credentials: 'include',
        //     method: 'GET',
        //     headers: new Headers({
        //         'content-type': 'application/json',
        //     })
        // }
        // let result = []
        // try {
        //     const res = await fetch(url, options)
        //     if (!res.ok) {
        //         throw new Error(JSON.stringify(res))
        //     }
        //     const resObject = await res.json()
        //     result = resObject
        // } catch (e) {
        //     throw Error('Error al obtener la info del usuario')
        // }
        // return result
        return { id: '123', name: 'david@notacool.com', pass: '1234' }
    }

    const createActivity = async (activity: CreateActivityForm): Promise<void> => {
        const url = `${conf.mainApiUrl}activity`
        const options: RequestInit = {
            method: 'POST',
            body: JSON.stringify(activity),
            headers: new Headers({
                'content-type': 'application/json',
            })
        }
        try {
            const res = await fetch(url, options)
            if (!res.ok) {
                throw new Error(JSON.stringify(res))
            }
        } catch (e) {
            throw Error('Error creating the activity')
        }
    }

    const updateActivity = async (activity: UpdateActivityForm): Promise<void> => {
        const url = `${conf.mainApiUrl}activity`
        const options: RequestInit = {
            method: 'PUT',
            body: JSON.stringify(activity),
            headers: new Headers({
                'content-type': 'application/json',
            })
        }
        try {
            const res = await fetch(url, options)
            if (!res.ok) {
                throw new Error(JSON.stringify(res))
            }
        } catch (e) {
            throw Error('Error updating the activity')
        }
    }


    const getActivity = async (id: string): Promise<Activity> => {
        const url = `${conf.mainApiUrl}activity/${id}`
        const options: RequestInit = {
            method: 'GET',
            headers: new Headers({
                'content-type': 'application/json',
            })
        }
        let result: Activity | undefined = undefined
        try {
            const res = await fetch(url, options)
            if (!res.ok) {
                throw new Error(JSON.stringify(res))
            }
            const resObject = await res.json()
            result = resObject
        } catch (e) {
            throw Error('Error getting the activity')
        }
        if (result === undefined) {
            throw Error('Error getting the activity')
        }

        return result
    }


    const getActivities = async (page: number, search: string): Promise<Page<Activity>> => {
        const url = `${conf.mainApiUrl}activity?page=${page}&search=${search}`
        const options: RequestInit = {
            credentials: 'include',
            method: 'GET',
            headers: new Headers({
                'content-type': 'application/json',
            })
        }
        let result = []
        try {
            const res = await fetch(url, options)
            if (!res.ok) {
                throw new Error(JSON.stringify(res))
            }
            const resObject = await res.json()
            result = resObject
        } catch (e) {
            throw Error('Error al obtener las actividades')
        }
        return result
    }

    const deleteActivity = async (id: string): Promise<void> => {
        const url = `${conf.mainApiUrl}activity/${id}`
        const options: RequestInit = {
            method: 'DELETE',
            headers: new Headers({
                'content-type': 'application/json',
            })
        }
        try {
            const res = await fetch(url, options)
            if (!res.ok) {
                throw new Error(JSON.stringify(res))
            }
        } catch (e) {
            throw Error('Error deleting activity')
        }
    }

    const createTask = async (task: CreateTaskForm): Promise<void> => {
        const url = `${conf.mainApiUrl}task`
        const options: RequestInit = {
            method: 'POST',
            body: JSON.stringify(task),
            headers: new Headers({
                'content-type': 'application/json',
            })
        }
        try {
            const res = await fetch(url, options)
            if (!res.ok) {
                throw new Error(JSON.stringify(res))
            }
        } catch (e) {
            throw Error('Error creating the task')
        }
    }

    const updateTask = async (task: UpdateTaskForm): Promise<void> => {
        const url = `${conf.mainApiUrl}task`
        const options: RequestInit = {
            method: 'PUT',
            body: JSON.stringify(task),
            headers: new Headers({
                'content-type': 'application/json',
            })
        }
        try {
            const res = await fetch(url, options)
            if (!res.ok) {
                throw new Error(JSON.stringify(res))
            }
        } catch (e) {
            throw Error('Error updating the task')
        }
    }

    const getUserTasks = async (userId: string, startDate: Date): Promise<Task[]> => {
        const dateStr = moment(startDate).format(conf.dateUrlFormat)
        console.log(conf.dateUrlFormat)
        console.log(dateStr)
        const url = `${conf.mainApiUrl}user/${userId}/tasks/${encodeURIComponent(dateStr)}`
        const options: RequestInit = {
            credentials: 'include',
            method: 'GET',
            headers: new Headers({
                'content-type': 'application/json',
            })
        }
        let result = []
        try {
            const res = await fetch(url, options)
            if (!res.ok) {
                throw new Error(JSON.stringify(res))
            }
            const resObject = await res.json()
            result = resObject
        } catch (e) {
            throw Error('Error obtaining user tasks')
        }
        return result
    }

    const deleteTask = async (id: string): Promise<void> => {
        const url = `${conf.mainApiUrl}task/${id}`
        const options: RequestInit = {
            method: 'DELETE',
            headers: new Headers({
                'content-type': 'application/json',
            })
        }
        try {
            const res = await fetch(url, options)
            if (!res.ok) {
                throw new Error(JSON.stringify(res))
            }
        } catch (e) {
            throw Error('Error deleting task')
        }
    }




    const value: ApiContext = {
        login,
        logout,
        getUserInfo,
        fakeDelay,
        createActivity,
        updateActivity,
        getActivity,
        getActivities,
        deleteActivity,
        createTask,
        updateTask,
        deleteTask,
        getUserTasks
    }

    return (
        <ApiContext.Provider value={value}>
            {children}
        </ApiContext.Provider>
    )
}
