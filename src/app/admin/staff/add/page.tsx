"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Dropdown, FormInput, Checkbox } from '@/components'
import { UserType, RoleType } from '@/utils/allModelTypes'
import { createStaff } from '@/utils/staffManagement'
import { getAllRoles } from '@/utils/staffManagement'
import { showToast } from '@/utils/toast'
import './_add_staff.scss'

function AddStaff() {
  const [staff, setStaff] = useState<Partial<UserType>>({
    username: '',
    email: '',
    password: '',
    roleId: 0,
    active: true,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [roles, setRoles] = useState<RoleType[]>([])
  const [selectedRole, setSelectedRole] = useState<string | number>("")
  const router = useRouter()

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const fetchedRoles = await getAllRoles()
        setRoles(fetchedRoles)
      } catch (error) {
        console.error('Failed to fetch roles:', error)
        showToast('error', 'Failed to load roles. Please refresh the page.')
      }
    }

    fetchRoles()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    window.scrollTo(0, 0)

    try {
      const createdStaff = await createStaff(staff as Omit<UserType, 'id' | 'createdAt' | 'updatedAt' | 'addresses' | 'orders' | 'reviews' | 'wishlist' | 'stripeCustomerId' | 'cart'>)
      showToast('success', `${createdStaff.username} staff member added successfully!`)
      router.push('/admin/staff')
    } catch (error) {
      console.error('Failed to add staff:', error)
      showToast('error', 'Failed to add staff member. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='add_staff_wrapper'>
      <header className='add_staff_header flex_row_center'>
        <h2 className='section_title add_staff_header_title'>Add Staff Member</h2>
        <Link href="/admin/staff" className='back_link border_button_void'>BACK</Link>
      </header>

      <form className='add_staff_form' onSubmit={handleSubmit}>
        <div className='add_staff_content flex_column_center'>
          <section className='form_inputs_section'>
            <FormInput
              label='Username'
              inputType='text'
              inputValue={staff.username || ''}
              required={true}
              readonly={false}
              onChangeFunction={(e: React.ChangeEvent<HTMLInputElement>) => setStaff({ ...staff, username: e.target.value })}
            />
            <FormInput
              label='Email'
              inputType='email'
              inputValue={staff.email || ''}
              required={true}
              readonly={false}
              onChangeFunction={(e: React.ChangeEvent<HTMLInputElement>) => setStaff({ ...staff, email: e.target.value })}
            />
            <FormInput
              label='Password'
              inputType='password'
              inputValue={staff.password || ''}
              required={true}
              readonly={false}
              onChangeFunction={(e: React.ChangeEvent<HTMLInputElement>) => setStaff({ ...staff, password: e.target.value })}
            />
            <Dropdown
              label='Role'
              items={roles?.map(role => role.name) || []}
              buttonText={selectedRole.toString() || "Select a role"}
              clickFunction={(item: string | number) => {
                const selectedRoleObject = roles?.find(role => role.name === item);
                if (selectedRoleObject) {
                  setStaff(prev => ({ ...prev, roleId: selectedRoleObject.id }));
                }
                setSelectedRole(item);
              }}
              required={true}
            />
          </section>
        </div>

        <div className='submit_button_section flex_column_justify_center'>
          <button type="submit" className='custom_button add_staff_form_button' disabled={isLoading}>
            {isLoading ? 'Saving...' : 'SAVE'}
          </button>

          <Checkbox
            label='Active'
            isChecked={staff.active}
            onChange={(e) => setStaff({ ...staff, active: e.target.checked })}
          />
        </div>
      </form>
    </div>
  )
}

export default AddStaff