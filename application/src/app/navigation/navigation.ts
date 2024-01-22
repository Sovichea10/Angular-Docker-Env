import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [


    // {
    //     id       : 'driver-request-point',
    //     title    : 'Driver Request Point',
    //     translate: 'NAV.driver-request-point',
    //     type     : 'collapsable',
    //     icon     : 'poll',
    //     permission: 'allow',
    //     children : [
    //         {
    //             id   : 'driver-request-point-search',
    //             title: 'Driver Request Point',
    //             translate: 'NAV.driver-request-point-search',
    //             type : 'item',
    //             url  : '/driver-request-point-search/search-driver',
    //             permission: 'search-driver',
    //         },
           
    //         {
    //             id   : 'list-driver-request-point',
    //             title: 'List Driver Request Point',
    //             translate: 'NAV.list-driver-request-point',
    //             type : 'item',
    //             url  : '/driver-request-point',
    //             permission: 'list-driver-request-point',
    //         },
           
    //     ]
    // },

    {
        id       : 'report',
        title    : 'report',
        translate: 'NAV.report',
        type     : 'collapsable',
        icon     : 'receipt',
        permission: 'allow',
        children : [
            {
                id   : 'all-report',
                title: 'incentive-income',
                translate: 'NAV.incentive-income',
                type : 'item',
                url  : '/reports/incentive-income',
                permission: 'allow',
            },
            {
                id   : 'company-income',
                title: 'company-income',
                translate: 'NAV.company-income',
                type : 'item',
                url  : '/reports/company-income',
                permission: 'allow',
            },
            {
                id   : 'monthly',
                title: 'monthly',
                translate: 'NAV.transfer-income',
                type : 'item',
                url  : '/reports/transfer-income',
                permission: 'allow',
            },
            {
                id   : 'tid-report',
                title: 'tid-report',
                translate: 'NAV.tid-report',
                type : 'item',
                url  : '/reports/tid-report',
                permission: 'allow',
            },
            {
                id   : 'bank-tid-report',
                title: 'bank-tid-report',
                translate: 'NAV.bank-tid-report',
                type : 'item',
                url  : '/reports/bank-tid-report',
                permission: 'allow',
            },
            {
                id   : 'non-tax',
                title: 'non-tax',
                translate: 'NAV.non-tax',
                type : 'item',
                url  : '/reports/non-tax',
                permission: 'allow',
            },
        ]
    },
    // {
    //     id       : 'report-monthly',
    //     title    : 'report-monthly',
    //     translate: 'NAV.report-monthly',
    //     type     : 'item',
    //     url      : '/report-monthly',
    //     icon     : 'event',
    //     permission: 'allow',
    // }


    // {
    //     id       : 'user-management',
    //     title    : 'User Management',
    //     translate: 'NAV.user-management',
    //     type     : 'collapsable',
    //     icon     : 'supervised_user_circle',
    //     permission: 'user',
    //     children : [
    //         {
    //             id   : 'user-management',
    //             title: 'User Management',
    //             translate: 'NAV.user-management-list',
    //             type : 'item',
    //             url  : '/users',
    //             permission: 'user',
    //         },
    //         {
    //             id   : 'role',
    //             title: 'role',
    //             translate: 'NAV.role-list',
    //             type : 'item',
    //             url  : '/setup/roles',
    //             permission: 'user',
    //         }
    //     ]
    // },

    // {
    //     id       : 'setup',
    //     title    : 'Setup',
    //     translate: 'NAV.setup',
    //     type     : 'collapsable',
    //     icon     : 'settings',
    //     permission: 'about-app',
    //     children : [
    //         {
    //             id   : 'about-app',
    //             title: 'About App',
    //             translate: 'NAV.about-app',
    //             type : 'item',
    //             url  : '/about-app',
    //             permission: 'about-app',
    //         },
    //         {
    //             id   : 'contact',
    //             title: 'contact',
    //             translate: 'NAV.contact',
    //             type : 'item',
    //             url  : '/contact',
    //             permission: 'contact',
    //         },
    //         {
    //             id   : 'feedback',
    //             title: 'feedback',
    //             translate: 'NAV.feedback',
    //             type : 'item',
    //             url  : '/feedback',
    //             permission: 'feedback',
    //         },
    //     ]
    // },

    // {
    //     id       : 'point-deduction-criteria',
    //     title    : 'point-deduction-criteria',
    //     translate: 'NAV.point-deduction-criteria',
    //     type     : 'collapsable',
    //     icon     : 'assignment',
    //     permission: 'vehicle-type',
    //     children : [
    //         {
    //             id   : 'vehicle-type',
    //             title: 'vehicle-type',
    //             translate: 'NAV.vehicle-type',
    //             type : 'item',
    //             url  : '/setup/driver-license-category',
    //             permission: 'vehicle-type',
    //         },
    //         {
    //             id   : 'rules',
    //             title: 'rules',
    //             translate: 'NAV.rules',
    //             type : 'item',
    //             url  : '/rules',
    //             permission: 'rule',
    //         },
           
    //     ]
    // },
    // {
    //     id       : 'user',
    //     title    : 'Users',
    //     translate: 'NAV.USER',
    //     type     : 'item',
    //     icon     : 'supervised_user_circle',
    //     url      : '/users',
    //     permission: 'user-list'
    // },

    // {
    //     id       : 'my-profile',
    //     title    : 'My Profile',
    //     translate: 'NAV.myprofile',
    //     type     : 'item',
    //     icon     : 'person',
    //     url      : '/my-profile',
    //     permission: ''
    // },
];
