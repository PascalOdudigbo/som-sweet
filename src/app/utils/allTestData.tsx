import { CategoryType, OfferType, ProductType } from "./allModelTypes";

export const testProducts: ProductType[] = [
    {
        id: 1,
        name: "Strawberry Cake",
        description: "A rich and moist Strawberry cake.",
        basePrice: 20.0,
        categoryId: 1,
        createdAt: new Date("2023-01-01T00:00:00Z"),
        updatedAt: new Date("2023-06-01T00:00:00Z"),
        images: [
            {
                id: 1,
                productId: 1,
                imageUrl: "https://res.cloudinary.com/db7dgsxy2/image/upload/v1688305644/Oink_Oink_Product_Images/nhovtinwmhezeltsvxnq.jpg",
                imagePublicId: "strawberry-cake",
                createdAt: new Date("2023-01-01T00:00:00Z"),
            },
        ],
    },
    {
        id: 2,
        name: "Glazed Donut",
        description: "A classic glazed donut.",
        basePrice: 2.5,
        categoryId: 2,
        createdAt: new Date("2023-01-01T00:00:00Z"),
        updatedAt: new Date("2023-06-01T00:00:00Z"),
        images: [
            {
                id: 2,
                productId: 2,
                imageUrl: "https://images.pexels.com/photos/4686958/pexels-photo-4686958.jpeg",
                imagePublicId: "glazed-donut",
                createdAt: new Date("2023-01-01T00:00:00Z"),
            },
        ],
    },
    {
        id: 3,
        name: "Chocolate Fudge",
        description: "A light and airy chocolate fudge shortcake.",
        basePrice: 18.0,
        categoryId: 1,
        createdAt: new Date("2023-01-01T00:00:00Z"),
        updatedAt: new Date("2023-06-01T00:00:00Z"),
        images: [
            {
                id: 3,
                productId: 3,
                imageUrl: "https://res.cloudinary.com/db7dgsxy2/image/upload/v1688247897/Oink_Oink_Product_Images/jvzs5cdwoqmqlhviow93.jpg",
                imagePublicId: "chocolate-fudge",
                createdAt: new Date("2023-01-01T00:00:00Z"),
            },
        ],
    },
    {
        id: 4,
        name: "Orange Cake",
        description: "A flavourful cake packed with fresh orange goodness.",
        basePrice: 3.0,
        categoryId: 3,
        createdAt: new Date("2023-01-01T00:00:00Z"),
        updatedAt: new Date("2023-06-01T00:00:00Z"),
        images: [
            {
                id: 4,
                productId: 4,
                imageUrl: "https://res.cloudinary.com/db7dgsxy2/image/upload/v1688248167/Oink_Oink_Product_Images/qaqhuomrewtskkbymycp.jpg",
                imagePublicId: "blueberry-muffin",
                createdAt: new Date("2023-01-01T00:00:00Z"),
            },
        ],
    },
    {
        id: 5,
        name: "French Baguette",
        description: "A classic French baguette with a crispy crust.",
        basePrice: 3.5,
        categoryId: 4,
        createdAt: new Date("2023-01-01T00:00:00Z"),
        updatedAt: new Date("2023-06-01T00:00:00Z"),
        images: [
            {
                id: 5,
                productId: 5,
                imageUrl: "https://cdn.pixabay.com/photo/2017/06/23/23/57/bread-2436370_1280.jpg",
                imagePublicId: "french-baguette",
                createdAt: new Date("2023-01-01T00:00:00Z"),
            },
        ],
    },
    {
        id: 6,
        name: "Cinnamon Roll",
        description: "A sweet roll with cinnamon and icing.",
        basePrice: 4.0,
        categoryId: 5,
        createdAt: new Date("2023-01-01T00:00:00Z"),
        updatedAt: new Date("2023-06-01T00:00:00Z"),
        images: [
            {
                id: 6,
                productId: 6,
                imageUrl: "https://cdn.pixabay.com/photo/2020/02/29/18/17/cinnamon-roll-4890783_1280.jpg",
                imagePublicId: "cinnamon-roll",
                createdAt: new Date("2023-01-01T00:00:00Z"),
            },
        ],
    },
];


export const testCategories: CategoryType[] = [
    {
        id: 1,
        name: "Cakes",
        image: "https://images.pexels.com/photos/3923555/pexels-photo-3923555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        imagePublicId: "cakes_public_id",
        products: []
    },
    {
        id: 2,
        name: "Cookies",
        image: "https://images.pexels.com/photos/14000524/pexels-photo-14000524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        imagePublicId: "cookies_public_id",
        products: []
    },
    {
        id: 8,
        name: "Donuts",
        image: "https://images.pexels.com/photos/7034525/pexels-photo-7034525.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        imagePublicId: "donuts_public_id",
        products: []
    },
    {
        id: 5,
        name: "Cupcakes",
        image: "https://images.pexels.com/photos/1120464/pexels-photo-1120464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        imagePublicId: "cupcakes_public_id",
        products: []
    },
    {
        id: 3,
        name: "Pastries",
        image: "https://images.pexels.com/photos/8177283/pexels-photo-8177283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        imagePublicId: "pastries_public_id",
        products: []
    },
    {
        id: 4,
        name: "Bread",
        image: "https://images.pexels.com/photos/960662/pexels-photo-960662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        imagePublicId: "bread_public_id",
        products: []
    },

    {
        id: 6,
        name: "Muffins",
        image: "https://images.unsplash.com/photo-1595450269117-a4c68af150d2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        imagePublicId: "muffins_public_id",
        products: []
    },
    {
        id: 7,
        name: "Tarts",
        image: "https://images.pexels.com/photos/2693447/pexels-photo-2693447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        imagePublicId: "tarts_public_id",
        products: []
    }

];


export const testOffers: OfferType[] = [
    {
        id: 1,
        productId: 1,
        name: "Summer Special",
        discountPercentage: 20,
        description: "Get 20% off on all cakes during the summer season!",
        validFrom: new Date("2023-06-01T00:00:00Z"),
        validUntil: new Date("2023-08-31T23:59:59Z"),
        image: "https://realfood.tesco.com/media/images/Honeycomb-CakeLGH-3b066737-5935-4812-83c7-1457ed599010-0-1400x919.jpg",
        imagePublicId: "summer-special",
        createdAt: new Date("2023-05-25T00:00:00Z"),
        updatedAt: new Date("2023-05-25T00:00:00Z"),
    },
    {
        id: 2,
        productId: 2,
        name: "Buy One Get One Free",
        discountPercentage: 50,
        description: "Buy one glazed donut and get another one for free!",
        validFrom: new Date("2023-01-01T00:00:00Z"),
        validUntil: new Date("2023-12-31T23:59:59Z"),
        image: "https://www.moneysavingexpert.com/content/dam/krispykreme.jpg",
        imagePublicId: "bogo-donut",
        createdAt: new Date("2023-01-01T00:00:00Z"),
        updatedAt: new Date("2023-01-01T00:00:00Z"),
    },
    {
        id: 3,
        productId: 4,
        name: "Holiday Special",
        discountPercentage: 15,
        description: "Enjoy a 15% discount on all cupcakes this holiday season!",
        validFrom: new Date("2023-12-01T00:00:00Z"),
        validUntil: new Date("2023-12-31T23:59:59Z"),
        image: "https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2024-06/national-cupcake-day-te-240610-72bdcd.jpg",
        imagePublicId: "holiday-cupcakes",
        createdAt: new Date("2023-11-15T00:00:00Z"),
        updatedAt: new Date("2023-11-15T00:00:00Z"),
    }
];
