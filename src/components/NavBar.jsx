import React from "react";
import { Fragment } from 'react';
import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import CartWidget from "./CartWidget";
import { Link } from "react-router-dom";
import CategoriesDropDown from "./CategoriesDropDown";
import ProductSearch from "./ProductSearch";
import ThemeToggle from "./ThemeToggle";
import GreenShopIcon from '../assets/GreenShopIcon.png'



export default function NavBar() {

    const navigation = [
      { name: 'Products', href: '/', current: false },
      { name: 'Contact', href: '/Contact', current: false },
    ]

    function classNames(...classes) {

        return classes.filter(Boolean).join(' ')
    }

    return (
        <Disclosure as="nav" className="bg-gray-800 w-full lg:w-full">
          {({ open }) => (
            <>
              <div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                  <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                    {/* Mobile menu button*/}
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex-1 flex items-center justify-end sm:items-stretch md:justify-center md:ml-auto lg:justify-start">
                    <div className="flex-shrink-0 flex items-center w-2/4 lg:w-1/4">
                        <Link
                            to={`/`}
                            className="hidden lg:block h-8 w-32 text-white text-lg cursor-pointer border-solid border-2 border-sky-500 rounded-md md:w-32 mr-2 bg-gray-700 text-shadow"
                        >   
                            <div className="flex px-1">
                              <img src={GreenShopIcon} alt="" className="w-6 h-6 "/>
                              <p>GreenShop</p>
                            </div>
                        </Link>
                        <Link
                            to={`/`}
                            className="block lg:hidden h-8 w-32 min-w-fit text-white text-lg cursor-pointer border-solid border-2 border-sky-500 rounded-md md:pr-8 md:pl-2 sm:pr-8 sm:pl-2 sm:ml-24 md:ml-28 bg-gray-700 text-shadow"
                        >   
                            <div className="flex px-1">
                              <img src={GreenShopIcon} alt="" className="w-6 h-6 "/>
                              <p>GreenShop</p>
                            </div>
                        </Link>
                    </div>
                    <div className="hidden lg:block">
                      <div className="flex lg:space-x-4">
                        <Link
                              key={navigation[0].name}
                              to={`${navigation[0].href}`}
                              className={classNames(
                                navigation[0].current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700',
                                'px-3 py-5 rounded-md text-md font-medium'
                              )}
                              aria-current={navigation[0].current ? 'page' : undefined}
                            >
                              {navigation[0].name}
                        </Link>
                        
                        <CategoriesDropDown
                          classNames={classNames}
                        />
                        <Link
                            key={navigation[1].name}
                            to={`${navigation[1].href}`}
                            className={classNames(
                              navigation[1].current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'px-3 py-5 rounded-md text-md font-medium'
                            )}
                            aria-current={navigation[1].current ? 'page' : undefined}
                          >
                            {navigation[1].name}
                          </Link>

                        <ProductSearch />
                        <CartWidget classNames={classNames}/>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center lg:relative ml-8 sm:static sm:inset-auto sm:ml-6 sm:pr-0 lg:pr-2">
                    {/* Light Mode and Dark Mode Toggle */}
                    <ThemeToggle />
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="lg:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1">
                    <Disclosure.Button
                      key={navigation[0].name}
                      as="a"
                      href={navigation[0].href}
                      className={classNames(
                        navigation[0].current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-5 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={navigation[0].current ? 'page' : undefined}
                    >
                      {navigation[0].name}
                    </Disclosure.Button>

                    <Disclosure.Button
                      key={navigation[1].name}
                      as="a"
                      href={navigation[1].href}
                      className={classNames(
                        navigation[1].current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-5 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={navigation[1].current ? 'page' : undefined}
                    >
                      {navigation[1].name}
                    </Disclosure.Button>
                    
                    <div className="block w-full hover:bg-gray-700 hover:rounded-md text-left">
                      <CategoriesDropDown
                            classNames={classNames}
                      />
                    </div>

                    <div className="block w-full hover:bg-gray-700 hover:rounded-md text-left ml-5">
                      <ProductSearch />
                    </div>
                    <div className="block w-1/6 hover:bg-gray-700 hover:rounded-md">
                      <CartWidget classNames={classNames}/>
                      
                    </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        
  )
}
