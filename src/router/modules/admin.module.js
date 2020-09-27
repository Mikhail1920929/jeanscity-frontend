import routes from '../routes'

export const admin = [
  {
    name: 'auth.login',
    path: '/login',
    component: () => import('pages/admin/Login.vue'),
    meta: {
      label: 'Страница входа'
    }
  },
  {
    name: 'admin.home',
    path: '/admin',
    component: () => import('layouts/Admin.vue'),
    meta: {
      auth: true,
      label: 'Панель администратора'
    },
    children: [
      {
        name: 'admin.board',
        path: '/',
        component: () => import('pages/admin/Board.vue'),
        children: [],
        meta: {
          label: 'Статистика',
          access: [
            'superadmin',
            'admin',
            'moder'
          ]
        },
      },
      {
        path: 'callbacks',
        component: () => import('pages/admin/callback/Index.vue'),
        meta: {
          label: 'Запросы',
          access: [
            'superadmin',
            'admin',
            'moder'
          ]
        },
        children: [
          {
            name: 'admin.callbacks',
            path: '/',
            meta: {
              access: [
                'admin',
                'superadmin'
              ]
            }
          },
          {
            name: 'admin.callbacks.answer',
            path: 'answer/:id',
            component: () => import('pages/admin/callback/Form.vue'),
            meta: {
              access: [
                'admin',
                'superadmin'
              ],
              label: 'Ответ'
            }
          }
        ]
      },
      {
        path: 'orders',
        component: () => import('pages/admin/order/Index.vue'),
        meta: {
          label: 'Заказы',
          access: [
            'moder',
            'admin',
            'superadmin'
          ]
        },
        children: [
          {
            name: 'admin.orders',
            path: '/',
            meta: {
              access: [
                'admin',
                'superadmin',
                'moder'
              ]
            }
          },
          {
            name: 'admin.orders.new',
            path: 'new',
            component: () => import('pages/admin/order/Form.vue'),
            meta: {
              access: [
                'admin',
                'superadmin',
                'moder'
              ],
              label: 'Новый заказ'
            }
          },
          {
            name: 'admin.orders.edit',
            path: 'edit/:id',
            component: () => import('pages/admin/order/Form.vue'),
            meta: {
              access: [
                'admin',
                'superadmin',
                'moder'
              ],
              label: 'Редактирование заказа'
            }
          }
        ]
      },
      {
        path: 'categories',
        component: () => import('pages/admin/category/Index.vue'),
        meta: {
          label: 'Категории',
          access: [
            'admin',
            'superadmin'
          ]
        },
        children: [
          {
            name: 'admin.categories',
            path: '/',
            meta: {
              access: [
                'admin',
                'superadmin'
              ]
            }
          },
          {
            name: 'admin.categories.new',
            path: 'new',
            component: () => import('pages/admin/category/Form.vue'),
            meta: {
              access: [
                'admin',
                'superadmin'
              ],
              label: 'Создание категории'
            }
          },
          {
            name: 'admin.categories.edit',
            path: 'edit/:id',
            component: () => import('pages/admin/category/Form.vue'),
            meta: {
              access: [
                'admin',
                'superadmin'
              ],
              label: 'Редактирование категории'
            }
          }
        ]
      },
      {
        path: 'home',
        component: () => import('pages/admin/homepage/Index.vue'),
        meta: {
          label: 'Настройки главной страницы',
          access: [
            'admin',
            'superadmin'
          ]
        },
        children: [
          {
            name: 'admin.homepage',
            path: '/',
            meta: {
              access: [
                'admin',
                'superadmin'
              ]
            }
          },
          {
            path: 'slider',
            component: () => import('pages/admin/homepage/slider/Index.vue'),
            meta: {
              label: 'Слайдер',
              access: [
                'admin',
                'superadmin'
              ]
            },
            children: [
              {
                name: 'admin.slider',
                path: '/',
                meta: {
                  access: [
                    'admin',
                    'superadmin'
                  ]
                }
              },
              {
                name: 'admin.slider.new',
                path: 'new',
                component: () => import('pages/admin/homepage/slider/Form.vue'),
                meta: {
                  access: [
                    'admin',
                    'superadmin'
                  ]
                }
              },
              {
                name: 'admin.slider.edit',
                path: 'edit/:id',
                component: () => import('pages/admin/homepage/slider/Form.vue'),
                meta: {
                  access: [
                    'admin',
                    'superadmin'
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        path: 'attributes',
        component: () => import('pages/admin/attribute/Index.vue'),
        meta: {
          label: 'Атрибуты товаров',
          access: [
            'admin',
            'superadmin'
          ]
        },
        children: [
          {
            name: 'admin.attributes',
            path: '/',
            meta: {
              access: [
                'admin',
                'superadmin'
              ]
            }
          },
          {
            name: 'admin.attributes.new',
            path: 'new',
            component: () => import('pages/admin/attribute/Form.vue'),
            meta: {
              access: [
                'admin',
                'superadmin'
              ],
              label: 'Создать атрибут'
            }
          },
          {
            name: 'admin.attributes.edit',
            path: 'edit/:id',
            component: () => import('pages/admin/attribute/Form.vue'),
            meta: {
              access: [
                'admin',
                'superadmin'
              ],
              label: 'Редактировать атрибут'
            }
          }
        ]
      },
      {
        path: 'shippings',
        component: () => import('pages/admin/shipping/Index.vue'),
        meta: {
          label: 'Методы доставки',
          access: [
            'admin',
            'superadmin'
          ]
        },
        children: [
          {
            name: 'admin.shippings',
            path: '/',
            meta: {
              access: [
                'admin',
                'superadmin'
              ]
            }
          },
          {
            name: 'admin.shippings.new',
            path: 'new',
            component: () => import('pages/admin/shipping/Form.vue'),
            meta: {
              access: [
                'admin',
                'superadmin'
              ],
              label: 'Создать метод доставки'
            }
          },
          {
            name: 'admin.shippings.edit',
            path: 'edit/:id',
            component: () => import('pages/admin/shipping/Form.vue'),
            meta: {
              access: [
                'admin',
                'superadmin'
              ],
              label: 'Редактировать метод доставки'
            }
          }
        ]
      },
      {
        path: 'mails',
        component: () => import('pages/admin/mail/Index.vue'),
        meta: {
          label: 'Рассылки',
          access: [
            'admin',
            'superadmin'
          ]
        },
        children: [
          {
            name: 'admin.mails',
            path: '/',
            meta: {
              access: [
                'admin',
                'superadmin'
              ]
            }
          },
          {
            name: 'admin.mails.new',
            path: 'new',
            component: () => import('pages/admin/mail/Form.vue'),
            meta: {
              access: [
                'admin',
                'superadmin'
              ],
              label: 'Добавить рассылку'
            }
          },
          {
            path: 'edit/:id',
            component: () => import('pages/admin/mail/Form.vue'),
            meta: {
              access: [
                'admin',
                'superadmin'
              ],
              label: 'Редактировать рассылку'
            }
          }
        ]
      },
      {
        path: 'customers',
        component: () => import('pages/admin/customers/Index.vue'),
        meta: {
          label: 'Покупатели',
          access: [
            'moder',
            'admin',
            'superadmin'
          ]
        },
        children: [
          {
            name: 'admin.customers',
            path: '/',
            meta: {
              access: [
                'moder',
                'admin',
                'superadmin'
              ]
            }
          },
          {
            name: 'admin.customers.edit',
            path: 'edit/:id',
            component: () => import('pages/admin/customers/Form.vue'),
            meta: {
              label: 'Редактирование покупателя'
            }
          }
        ]
      },
      {
        path: 'products',
        component: () => import('pages/admin/products/Products.vue'),
        meta: {
          access: [
            'admin',
            'superadmin'
          ],
          label: 'Товары'
        },
        children: [
          {
            name: 'admin.products',
            path: '/',
            component: () => import('pages/admin/products/Index.vue'),
            meta: {
              access: [
                'admin',
                'superadmin'
              ],
              label: 'Все товары'
            }
          },
          {
            name: 'admin.products.new',
            path: 'new',
            component: () => import('pages/admin/products/Form.vue'),
            meta: {
              access: [
                'admin',
                'superadmin'
              ],
              label: 'Создание товара'
            }
          },
          {
            name: 'admin.products.edit',
            path: 'edit/:slug',
            component: () => import('pages/admin/products/Form.vue'),
            meta: {
              access: [
                'admin',
                'superadmin'
              ],
              label: 'Редактирование товара'
            }
          }
        ]
      },
      {
        path: 'users',
        component: () => import('pages/admin/user/Index.vue'),
        meta: {
          access: [
            'admin',
            'superadmin'
          ],
          label: 'Пользователи'
        },
        children: [
          {
            name: 'admin.users',
            path: '/',
            meta: {
              access: [
                'admin',
                'superadmin'
              ]
            }
          },
          {
            name: 'admin.users.new',
            path: 'new',
            component: () => import('pages/admin/user/Form.vue'),
            meta: {
              access: [
                'admin',
                'superadmin'
              ],
              label: 'Создать пользователя'
            }
          },
          {
            name: 'admin.users.edit',
            path: 'edit/:id',
            component: () => import('pages/admin/user/Form.vue'),
            meta: {
              access: [
                'admin',
                'superadmin'
              ],
              label: 'Редактировать пользователя'
            }
          }
        ]
      },
      {
        path: 'pages',
        component: () => import('pages/admin/pages/Pages.vue'),
        meta: {
          access: [
            'admin',
            'superadmin'
          ],
          label: 'Страницы'
        },
        children: [
          {
            name: 'admin.pages',
            path: '/',
            component: () => import('pages/admin/pages/Index.vue'),
            meta: {
              access: [
                'admin',
                'superadmin'
              ],
              label: 'Все страницы'
            }
          },
          {
            name: 'admin.pages.new',
            path: 'new',
            component: () => import('pages/admin/pages/Form.vue'),
            meta: {
              access: [
                'admin',
                'superadmin'
              ],
              label: 'Создание страницы'
            }
          },
          {
            name: 'admin.pages.edit',
            path: 'edit/:id',
            component: () => import('pages/admin/pages/Form.vue'),
            meta: {
              access: [
                'admin',
                'superadmin'
              ],
              label: 'Редактировать страницу'
            }
          }
        ]
      }
    ]
  }
]
