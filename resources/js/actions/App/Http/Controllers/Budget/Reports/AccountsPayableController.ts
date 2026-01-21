import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Budget\Reports\AccountsPayableController::__invoke
 * @see app/Http/Controllers/Budget/Reports/AccountsPayableController.php:19
 * @route '/budget/export/accounts-payable-report'
 */
const AccountsPayableController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: AccountsPayableController.url(options),
    method: 'get',
})

AccountsPayableController.definition = {
    methods: ["get","head"],
    url: '/budget/export/accounts-payable-report',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Budget\Reports\AccountsPayableController::__invoke
 * @see app/Http/Controllers/Budget/Reports/AccountsPayableController.php:19
 * @route '/budget/export/accounts-payable-report'
 */
AccountsPayableController.url = (options?: RouteQueryOptions) => {
    return AccountsPayableController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Budget\Reports\AccountsPayableController::__invoke
 * @see app/Http/Controllers/Budget/Reports/AccountsPayableController.php:19
 * @route '/budget/export/accounts-payable-report'
 */
AccountsPayableController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: AccountsPayableController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Budget\Reports\AccountsPayableController::__invoke
 * @see app/Http/Controllers/Budget/Reports/AccountsPayableController.php:19
 * @route '/budget/export/accounts-payable-report'
 */
AccountsPayableController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: AccountsPayableController.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Budget\Reports\AccountsPayableController::__invoke
 * @see app/Http/Controllers/Budget/Reports/AccountsPayableController.php:19
 * @route '/budget/export/accounts-payable-report'
 */
    const AccountsPayableControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: AccountsPayableController.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Budget\Reports\AccountsPayableController::__invoke
 * @see app/Http/Controllers/Budget/Reports/AccountsPayableController.php:19
 * @route '/budget/export/accounts-payable-report'
 */
        AccountsPayableControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: AccountsPayableController.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Budget\Reports\AccountsPayableController::__invoke
 * @see app/Http/Controllers/Budget/Reports/AccountsPayableController.php:19
 * @route '/budget/export/accounts-payable-report'
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