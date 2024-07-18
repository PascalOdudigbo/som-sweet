import db from '../db/db';

// Staff data
export async function getStaffStats() {
  const totalStaff = await db.user.count({
    where: { role: { name: 'staff' } }
  });
  const activeStaff = await db.user.count({
    where: { role: { name: 'staff' }, active: true }
  });
  const inactiveStaff = totalStaff - activeStaff;

  return { totalStaff, activeStaff, inactiveStaff };
}

// Customer data
export async function getCustomerStats() {
  const totalCustomers = await db.user.count({
    where: { role: { name: 'customer' } }
  });
  const newThisMonth = await db.user.count({
    where: {
      role: { name: 'customer' },
      createdAt: { gte: new Date(new Date().setDate(1)) } // First day of current month
    }
  });
  const pendingApprovals = await db.user.count({
    where: { role: { name: 'customer' }, active: false }
  });

  return { totalCustomers, newThisMonth, pendingApprovals };
}

// Product data
export async function getProductStats() {
  const totalProducts = await db.product.count();
  const activeProducts = await db.product.count({ where: { active: true } });
  const inactiveProducts = totalProducts - activeProducts;

  return { totalProducts, activeProducts, inactiveProducts };
}

// Offer data
export async function getOfferStats() {
  const now = new Date();
  const activeOffers = await db.discount.count({
    where: {
      validFrom: { lte: now },
      validUntil: { gte: now }
    }
  });
  const upcomingOffers = await db.discount.count({
    where: { validFrom: { gt: now } }
  });
  const expiredOffers = await db.discount.count({
    where: { validUntil: { lt: now } }
  });

  return { activeOffers, upcomingOffers, expiredOffers };
}

// Order data
export async function getOrderStats() {
  const totalOrders = await db.order.count();
  const pendingOrders = await db.order.count({ where: { status: 'Pending' } });
  const shippedOrders = await db.order.count({ where: { status: 'Shipped' } });

  return { totalOrders, pendingOrders, shippedOrders };
}

// Recent activity data
export async function getRecentActivity() {
  const recentCustomer = await db.user.findFirst({
    where: { role: { name: 'customer' } },
    orderBy: { createdAt: 'desc' },
    select: { username: true }
  });

  const recentOrder = await db.order.findFirst({
    where: { status: 'Shipped' },
    orderBy: { updatedAt: 'desc' },
    select: { id: true }
  });

  const recentProduct = await db.product.findFirst({
    orderBy: { createdAt: 'desc' },
    select: { name: true }
  });

  return {
    recentCustomer: recentCustomer?.username || 'N/A',
    recentOrder: recentOrder?.id.toString() || 'N/A',
    recentProduct: recentProduct?.name || 'N/A'
  };
}

// Sales overview data (for chart)
export async function getSalesOverview() {
  // This is a placeholder. You'll need to adjust based on your specific chart requirements
  const lastSixMonths = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    return d.toISOString().slice(0, 7); // YYYY-MM format
  }).reverse();

  const salesStats = await Promise.all(lastSixMonths.map(async (month) => {
    const startOfMonth = new Date(month);
    const endOfMonth = new Date(new Date(month).setMonth(startOfMonth.getMonth() + 1));
    
    const sales = await db.order.aggregate({
      where: {
        createdAt: {
          gte: startOfMonth,
          lt: endOfMonth
        }
      },
      _sum: {
        total: true
      }
    });

    return {
      month,
      sales: sales._sum.total || 0
    };
  }));

  return salesStats;
}


