'use client';
import React, { useEffect, useState } from 'react';
import { IconContext } from 'react-icons'
import { FaUser } from 'react-icons/fa'
import { GiShoppingBag } from 'react-icons/gi'
import { MdReviews } from 'react-icons/md'
import { TbRosetteDiscountCheckFilled } from 'react-icons/tb'
import "./_dashboard.scss"
import {DashboardData} from '../../../utils/pages/adminDashboard/adminDashboardTypes'


function Dashboard() {
  // Declaring a state variable to hold all the dashboard data
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    staff: null,
    customers: null,
    products: null,
    offers: null,
    orders: null,
    recentActivity: null,
    salesOverview: null,
  });

  useEffect(() => {
    // A function to fetch all the data 
    async function fetchDashboardData() {
      try {
        // Store their responses in variables
        const [
          staffResponse,
          customersResponse,
          productsResponse,
          offersResponse,
          ordersResponse,
          recentActivityResponse,
          salesOverviewResponse
        ] = await Promise.all([
          fetch('/api/admin/dashboard/staff'),
          fetch('/api/admin/dashboard/customer'),
          fetch('/api/admin/dashboard/product'),
          fetch('/api/admin/dashboard/offer'),
          fetch('/api/admin/dashboard/order'),
          fetch('/api/admin/dashboard/recentActivity'),
          fetch('/api/admin/dashboard/salesOverview')
        ]);

        // Get the data into json format and store in an array of objects
        const [
          staff,
          customers,
          products,
          offers,
          orders,
          recentActivity,
          salesOverview
        ] = await Promise.all([
          staffResponse.json(),
          customersResponse.json(),
          productsResponse.json(),
          offersResponse.json(),
          ordersResponse.json(),
          recentActivityResponse.json(),
          salesOverviewResponse.json()
        ]);
        // Set the data appropriately
        setDashboardData({
          staff,
          customers,
          products,
          offers,
          orders,
          recentActivity,
          salesOverview
        });
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        // Handle error (show error message to user)
      }
    }

    fetchDashboardData();
  }, []);

    return (
        <main className='dashboard_content'>
            <h1 className='dashboard_title section_title'>Dashboard</h1>

            <div className="dashboard_grid">
                <div className="dashboard_card">
                    <IconContext.Provider value={{ className: "dashboard_icon" }}>
                        <FaUser />
                    </IconContext.Provider>
                    <h2>Staff</h2>
                    <p>Total: {dashboardData?.staff?.totalStaff}</p>
                    <p>Active: {dashboardData?.staff?.activeStaff}</p>
                    <p>Inactive: {dashboardData?.staff?.inactiveStaff}</p>
                </div>

                <div className="dashboard_card">
                    <IconContext.Provider value={{ className: "dashboard_icon" }}>
                        <FaUser />
                    </IconContext.Provider>
                    <h2>Customers</h2>
                    <p>Total: {dashboardData?.customers?.totalCustomers}</p>
                    <p>New this month: {dashboardData?.customers?.newThisMonth}</p>
                    <p>Pending approvals: {dashboardData?.customers?.pendingApprovals}</p>
                </div>

                <div className="dashboard_card">
                    <IconContext.Provider value={{ className: "dashboard_icon" }}>
                        <GiShoppingBag />
                    </IconContext.Provider>
                    <h2>Products</h2>
                    <p>Total: {dashboardData?.products?.totalProducts}</p>
                    <p>Active: {dashboardData?.products?.activeProducts}</p>
                    <p>Inactive: {dashboardData?.products?.inactiveProducts}</p>
                </div>

                <div className="dashboard_card">
                    <IconContext.Provider value={{ className: "dashboard_icon" }}>
                        <TbRosetteDiscountCheckFilled />
                    </IconContext.Provider>
                    <h2>Offers</h2>
                    <p>Active: {dashboardData?.offers?.activeOffers}</p>
                    <p>Upcoming: {dashboardData?.offers?.upcomingOffers}</p>
                    <p>Expired: {dashboardData?.offers?.expiredOffers}</p>
                </div>

                <div className="dashboard_card">
                    <IconContext.Provider value={{ className: "dashboard_icon" }}>
                        <MdReviews />
                    </IconContext.Provider>
                    <h2>Orders</h2>
                    <p>Total: {dashboardData?.orders?.totalOrders}</p>
                    <p>Pending: {dashboardData?.orders?.pendingOrders}</p>
                    <p>Shipped: {dashboardData?.orders?.shippedOrders}</p>
                </div>
            </div>

            <div className="dashboard_chart">
                <h2>Sales Overview</h2>
                {/* Insert chart component here during or after dissertation*/}
                <p>Chart placeholder</p>
            </div>

            <div className="dashboard_recent_activity">
                <h2>Recent Activity</h2>
                <ul>
                    <li>New customer registered: {dashboardData?.recentActivity?.recentCustomer}</li>
                    <li>Order #{dashboardData?.recentActivity?.recentOrder} shipped</li>
                    <li>New product added: {dashboardData?.recentActivity?.recentProduct}</li>
                    {/* <li>Staff member updated: Jane Smith</li> */}
                </ul>
            </div>
        </main>

    )
}

export default Dashboard