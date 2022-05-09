import React, { Fragment} from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Link } from 'react-router-dom'


const CategoriesDropDown = ({classNames}) => {

  const categories = ["Flours", "Grain", "Nuts", "Others","Seeds"]
    
    return (
        <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className='text-gray-300 h-16 hover:bg-gray-700 hover:text-white px-3 py-4 rounded-md text-md font-medium'>
                            <span className="sr-only">Categories</span>
                            <span className="h-6 w-6 text-gray-200 hover:text-gray-200" aria-hidden="true">Categories</span>

                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className={"z-10 origin-top-right absolute mt-1 w-48 rounded-md shadow-lg py-1 bg-yellow-50 ring-1 ring-black ring-opacity-5 focus:outline-none"}>
                          {
                            categories.map((item,index) => (
                              <Menu.Item
                                key={item}
                              >
                                {({ active }) => (
                                  <Link
                                    key={item[index]}
                                    to={`/Categories/${item}`}
                                    className={classNames(active ? 'bg-green-300' : 'bg-yellow-50', 'block px-4 py-2 text-sm text-gray-700')}
                                  >
                                    {item}
                                  </Link>
                                )}
                              </Menu.Item>
                            ))
                            
                          }
                        </Menu.Items>
                      </Transition>
                    </Menu>
    )
}

export default CategoriesDropDown
