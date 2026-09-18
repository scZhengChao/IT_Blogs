# 声明周期

## 目录

- [appear/disAppear   hooks](#appeardisAppear--hooks)

# appear/disAppear   hooks

```javascript 
 import { useState, useEffect, useContext } from 'react'
import { ReactReduxContext } from 'react-redux'
import _ from 'lodash'

type ISelector = (state: any) => any
const defualtSelecter = (d: any) => d
export default function useStore(selector: ISelector = defualtSelecter) {
    const { store } = useContext(ReactReduxContext)
    const { getState, dispatch, subscribe } = store
    const [value, setValue] = useState(selector(getState()))
    useEffect(() => {
        return subscribe(() => setValue(selector(getState())))
    }, [])

    return [value, dispatch]
}

export const useRouteLifeCycle = (() => {
    const preStackRoutes: any = {}
    return (current: string, { appear = _.noop, disAppear = _.noop }) => {
        const currentStackKey = `${current}-route`
        if (!preStackRoutes[currentStackKey]) {
            preStackRoutes[currentStackKey] = ''
        }
        const [routes] = useStore(d => d.routes.routes)
        if (!routes || routes.length === 0) return
        const last = routes[routes.length - 1]
        if (last.routeName === preStackRoutes[currentStackKey]) return
        preStackRoutes[currentStackKey] = last.routeName
        last.routeName === current ? appear() : disAppear()
    }
})()

```
