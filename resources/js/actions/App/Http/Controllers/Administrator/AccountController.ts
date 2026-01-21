import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Administrator\AccountController::index
 * @see app/Http/Controllers/Administrator/AccountController.php:21
 * @route '/administrator/accounts'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/administrator/accounts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Administrator\AccountController::index
 * @see app/Http/Controllers/Administrator/AccountController.php:21
 * @route '/administrator/accounts'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\AccountController::index
 * @see app/Http/Controllers/Administrator/AccountController.php:21
 * @route '/administrator/accounts'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Administrator\AccountController::index
 * @see app/Http/Controllers/Administrator/AccountController.php:21
 * @route '/administrator/accounts'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Administrator\AccountController::index
 * @see app/Http/Controllers/Administrator/AccountController.php:21
 * @route '/administrator/accounts'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Administrator\AccountController::index
 * @see app/Http/Controllers/Administrator/AccountController.php:21
 * @route '/administrator/accounts'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Administrator\AccountController::index
 * @see app/Http/Controllers/Administrator/AccountController.php:21
 * @route '/administrator/accounts'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Administrator\AccountController::store
 * @see app/Http/Controllers/Administrator/AccountController.php:32
 * @route '/administrator/accounts'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/administrator/accounts',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Administrator\AccountController::store
 * @see app/Http/Controllers/Administrator/AccountController.php:32
 * @route '/administrator/accounts'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\AccountController::store
 * @see app/Http/Controllers/Administrator/AccountController.php:32
 * @route '/administrator/accounts'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Administrator\AccountController::store
 * @see app/Http/Controllers/Administrator/AccountController.php:32
 * @route '/administrator/accounts'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\AccountController::store
 * @see app/Http/Controllers/Administrator/AccountController.php:32
 * @route '/administrator/accounts'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Administrator\AccountController::update
 * @see app/Http/Controllers/Administrator/AccountController.php:42
 * @route '/administrator/accounts/{account}'
 */
export const update = (args: { account: number | { id: number } } | [account: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/administrator/accounts/{account}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Administrator\AccountController::update
 * @see app/Http/Controllers/Administrator/AccountController.php:42
 * @route '/administrator/accounts/{account}'
 */
update.url = (args: { account: number | { id: number } } | [account: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { account: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { account: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    account: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        account: typeof args.account === 'object'
                ? args.account.id
                : args.account,
                }

    return update.definition.url
            .replace('{account}', parsedArgs.account.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\AccountController::update
 * @see app/Http/Controllers/Administrator/AccountController.php:42
 * @route '/administrator/accounts/{account}'
 */
update.put = (args: { account: number | { id: number } } | [account: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Administrator\AccountController::update
 * @see app/Http/Controllers/Administrator/AccountController.php:42
 * @route '/administrator/accounts/{account}'
 */
update.patch = (args: { account: number | { id: number } } | [account: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Administrator\AccountController::update
 * @see app/Http/Controllers/Administrator/AccountController.php:42
 * @route '/administrator/accounts/{account}'
 */
    const updateForm = (args: { account: number | { id: number } } | [account: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\AccountController::update
 * @see app/Http/Controllers/Administrator/AccountController.php:42
 * @route '/administrator/accounts/{account}'
 */
        updateForm.put = (args: { account: number | { id: number } } | [account: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Administrator\AccountController::update
 * @see app/Http/Controllers/Administrator/AccountController.php:42
 * @route '/administrator/accounts/{account}'
 */
        updateForm.patch = (args: { account: number | { id: number } } | [account: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const AccountController = { index, store, update }

export default AccountController