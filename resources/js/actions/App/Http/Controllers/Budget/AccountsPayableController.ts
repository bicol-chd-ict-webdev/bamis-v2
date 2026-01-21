import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Budget\AccountsPayableController::__invoke
 * @see app/Http/Controllers/Budget/AccountsPayableController.php:24
 * @route '/budget/accounts-payables'
 */
const AccountsPayableController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: AccountsPayableController.url(options),
    method: 'get',
})

AccountsPayableController.definition = {
    methods: ["get","head"],
    url: '/budget/accounts-payables',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Budget\AccountsPayableController::__invoke
 * @see app/Http/Controllers/Budget/AccountsPayableController.php:24
 * @route '/budget/accounts-payables'
 */
AccountsPayableController.url = (options?: RouteQueryOptions) => {
    return AccountsPayableController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\AccountsPayableController::__invoke
 * @see app/Http/Controllers/Budget/AccountsPayableController.php:24
 * @route '/budget/accounts-payables'
 */
AccountsPayableController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: AccountsPayableController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Budget\AccountsPayableController::__invoke
 * @see app/Http/Controllers/Budget/AccountsPayableController.php:24
 * @route '/budget/accounts-payables'
 */
AccountsPayableController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: AccountsPayableController.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Budget\AccountsPayableController::__invoke
 * @see app/Http/Controllers/Budget/AccountsPayableController.php:24
 * @route '/budget/accounts-payables'
 */
    const AccountsPayableControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: AccountsPayableController.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Budget\AccountsPayableController::__invoke
 * @see app/Http/Controllers/Budget/AccountsPayableController.php:24
 * @route '/budget/accounts-payables'
 */
        AccountsPayableControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: AccountsPayableController.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Budget\AccountsPayableController::__invoke
 * @see app/Http/Controllers/Budget/AccountsPayableController.php:24
 * @route '/budget/accounts-payables'
 */
        AccountsPayableControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: AccountsPayableController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    AccountsPayableController.form = AccountsPayableControllerForm
export default AccountsPayableController