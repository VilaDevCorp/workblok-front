import moment from 'moment';
import React, { createContext, ReactNode, useContext } from 'react';
import StatusCode from 'status-code-enum';
import { Activity, CreateActivityForm, CreateTaskForm, RegisterUserForm, Task, Test, UpdateActivityForm, UpdateTaskForm, User } from '../types/entities';
import { Page } from '../types/types';
import { conf } from './../conf'
import { useAuth } from './useAuth';

export interface ApiContext {
    register: (user: RegisterUserForm) => void
    logout: () => void
    fakeDelay: (delay: number) => void
    createActivity: (activity: CreateActivityForm) => Promise<void>
    updateActivity: (activity: UpdateActivityForm) => Promise<void>
    getActivity: (id: string) => Promise<Activity>
    getActivities: (page: number, search: string) => Promise<Page<Activity>>
    deleteActivities: (ids: string[]) => Promise<void>
    createTask: (task: CreateTaskForm) => Promise<void>
    updateTask: (task: UpdateTaskForm) => Promise<void>
    deleteTask: (id: string) => Promise<void>
    getUserTasks: (userId: string, startDate: Date) => Promise<Task[]>,
    updateUserDans: (userId: string, isAdd: boolean, value: number) => Promise<void>,
    getUser: (id: string) => Promise<User>
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

    const { csrfToken } = useAuth()

    function fakeDelay(delay: number) {
        return new Promise(res => setTimeout(res, delay));
    }

    const register = async (user: RegisterUserForm) => {
        const url = `${conf.mainApiUrl}public/register`
        const options: RequestInit = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: new Headers({
                'content-type': 'application/json',
            })
        }
        let result = []
        try {
            const res = await fetch(url, options)
            if (res.status === StatusCode.SuccessCreated) {
                console.log("Usuario registrado con éxito")
            } else {
                if (res.status === StatusCode.ServerErrorInternal) {
                    console.log("Ha ocurrido un error al realizar la operación")
                }
                if (res.status === StatusCode.ClientErrorBadRequest) {
                    console.log("El formulario enviado en la petición no es correcto")
                }
                throw new Error(JSON.stringify(res))
            }
        } catch (e) {
            console.log("Ha ocurrido un error al realizar la operación")
        }
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

    const createActivity = async (activity: CreateActivityForm): Promise<void> => {
        const url = `${conf.mainApiUrl}private/activity`
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
        const url = `${conf.mainApiUrl}private/activity`
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
        const url = `${conf.mainApiUrl}private/activity/${id}`
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
        const url = `${conf.mainApiUrl}private/activity?page=${page}&search=${search}`
        const options: RequestInit = {
            credentials: 'include',
            method: 'GET',
            headers: new Headers({
                'X-API-CSRF': csrfToken ? csrfToken : '',
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

    const deleteActivities = async (ids: string[]): Promise<void> => {
        const url = `${conf.mainApiUrl}private/activity`
        const options: RequestInit = {
            method: 'DELETE',
            body: JSON.stringify({ ids: ids }),
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
            throw Error('Error deleting activities')
        }
    }

    const createTask = async (task: CreateTaskForm): Promise<void> => {
        const url = `${conf.mainApiUrl}private/task`
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
        const url = `${conf.mainApiUrl}private/task`
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
        const url = `${conf.mainApiUrl}private/user/${userId}/tasks/${encodeURIComponent(dateStr)}`
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
        const url = `${conf.mainApiUrl}private/task/${id}`
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

    const getUser = async (id: string): Promise<User> => {
        const url = `${conf.mainApiUrl}private/user/${id}`
        const options: RequestInit = {
            method: 'GET',
            headers: new Headers({
                'content-type': 'application/json',
            })
        }
        let result: User | undefined = undefined
        try {
            const res = await fetch(url, options)
            if (!res.ok) {
                throw new Error(JSON.stringify(res))
            }
            const resObject = await res.json()
            result = resObject
        } catch (e) {
            throw Error('Error getting the user')
        }
        if (result === undefined) {
            throw Error('Error getting the user')
        }

        return result
    }

    const updateUserDans = async (userId: string, isAdd: boolean, value: number): Promise<void> => {
        const url = `${conf.mainApiUrl}private/user/${userId}/dans?add=${isAdd}&value=${value}`
        const options: RequestInit = {
            credentials: 'include',
            method: 'PATCH',
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
            throw Error('Error updating user dans')
        }
    }





    const value: ApiContext = {
        register,
        logout,
        fakeDelay,
        createActivity,
        updateActivity,
        getActivity,
        getActivities,
        deleteActivities,
        createTask,
        updateTask,
        deleteTask,
        getUserTasks,
        getUser,
        updateUserDans
    }

    return (
        <ApiContext.Provider value={value}>
            {children}
        </ApiContext.Provider>
    )
}
