import { ProductType } from "./allModelTypes";

export const testProducts = [
    {
        id: 1,
        name: "Strawberry Cake",
        description: "A rich and moist Strawberry cake.",
        basePrice: 20.0,
        categoryId: 1,
        createdAt: new Date("2023-01-01T00:00:00Z"),
        updatedAt: new Date("2023-06-01T00:00:00Z"),
        // category: {
        //     id: 1,
        //     name: "Cakes",
        // },
        // variations: [
        //     {
        //         id: 1,
        //         productId: 1,
        //         name: "Large",
        //         price: 25.0,
        //         stock: 10,
        //         createdAt: new Date("2023-01-01T00:00:00Z"),
        //         updatedAt: new Date("2023-06-01T00:00:00Z"),
        //     },
        //     {
        //         id: 2,
        //         productId: 1,
        //         name: "Small",
        //         price: 15.0,
        //         stock: 20,
        //         createdAt: new Date("2023-01-01T00:00:00Z"),
        //         updatedAt: new Date("2023-06-01T00:00:00Z"),
        //     },
        // ],
        images: [
            {
                id: 1,
                productId: 1,
                imageUrl: "https://res.cloudinary.com/db7dgsxy2/image/upload/v1688305644/Oink_Oink_Product_Images/nhovtinwmhezeltsvxnq.jpg",
                imagePublicId: "chocolate-cake",
                createdAt: new Date("2023-01-01T00:00:00Z"),
            },
        ],
        // reviews: [
        //     {
        //         id: 1,
        //         productId: 1,
        //         userId: 1,
        //         rating: 5,
        //         review: "Delicious and rich chocolate flavor!",
        //         createdAt: new Date("2023-01-01T00:00:00Z"),
        //         updatedAt: new Date("2023-06-01T00:00:00Z"),
        //         user: {
        //             id: 1,
        //             username: "john_doe",
        //             email: "john@example.com",
        //             roleId: 1,
        //         },
        //     },
        // ],
    },
    {
        id: 2,
        name: "Glazed Donut",
        description: "A classic glazed donut.",
        basePrice: 2.5,
        categoryId: 2,
        createdAt: new Date("2023-01-01T00:00:00Z"),
        updatedAt: new Date("2023-06-01T00:00:00Z"),
        // category: {
        //     id: 2,
        //     name: "Donuts",
        // },
        // variations: [
        //     {
        //         id: 3,
        //         productId: 2,
        //         name: "Single",
        //         price: 2.5,
        //         stock: 50,
        //         createdAt: new Date("2023-01-01T00:00:00Z"),
        //         updatedAt: new Date("2023-06-01T00:00:00Z"),
        //     },
        //     {
        //         id: 4,
        //         productId: 2,
        //         name: "Dozen",
        //         price: 25.0,
        //         stock: 10,
        //         createdAt: new Date("2023-01-01T00:00:00Z"),
        //         updatedAt: new Date("2023-06-01T00:00:00Z"),
        //     },
        // ],
        images: [
            {
                id: 2,
                productId: 2,
                imageUrl: "https://images.pexels.com/photos/4686958/pexels-photo-4686958.jpeg",
                imagePublicId: "glazed-donut",
                createdAt: new Date("2023-01-01T00:00:00Z"),
            },
        ],
        // reviews: [
        //     {
        //         id: 2,
        //         productId: 2,
        //         userId: 2,
        //         rating: 4,
        //         review: "Very tasty but a bit too sweet for my liking.",
        //         createdAt: new Date("2023-01-01T00:00:00Z"),
        //         updatedAt: new Date("2023-06-01T00:00:00Z"),
        //         user: {
        //             id: 2,
        //             username: "jane_doe",
        //             email: "jane@example.com",
        //             roleId: 1,
        //         },
        //     },
        // ],
    },
    {
        id: 3,
        name: "Chocolate Fudge",
        description: "A light and airy chocolate fudge shortcake.",
        basePrice: 18.0,
        categoryId: 1,
        createdAt: new Date("2023-01-01T00:00:00Z"),
        updatedAt: new Date("2023-06-01T00:00:00Z"),
        // category: {
        //     id: 1,
        //     name: "Cakes",
        // },
        // variations: [
        //     {
        //         id: 5,
        //         productId: 3,
        //         name: "Large",
        //         price: 22.0,
        //         stock: 8,
        //         createdAt: new Date("2023-01-01T00:00:00Z"),
        //         updatedAt: new Date("2023-06-01T00:00:00Z"),
        //     },
        //     {
        //         id: 6,
        //         productId: 3,
        //         name: "Small",
        //         price: 14.0,
        //         stock: 15,
        //         createdAt: new Date("2023-01-01T00:00:00Z"),
        //         updatedAt: new Date("2023-06-01T00:00:00Z"),
        //     },
        // ],
        images: [
            {
                id: 3,
                productId: 3,
                imageUrl: "https://res.cloudinary.com/db7dgsxy2/image/upload/v1688247897/Oink_Oink_Product_Images/jvzs5cdwoqmqlhviow93.jpg",
                imagePublicId: "strawberry-shortcake",
                createdAt: new Date("2023-01-01T00:00:00Z"),
            },
        ],
        // reviews: [
        //     {
        //         id: 3,
        //         productId: 3,
        //         userId: 3,
        //         rating: 5,
        //         review: "Perfect balance of sweet and tart!",
        //         createdAt: new Date("2023-01-01T00:00:00Z"),
        //         updatedAt: new Date("2023-06-01T00:00:00Z"),
        //         user: {
        //             id: 3,
        //             username: "alice_smith",
        //             email: "alice@example.com",
        //             roleId: 1,
        //         },
        //     },
        // ],
    },
    {
        id: 4,
        name: "Blueberry Cupcakes",
        description: "A muffin packed with fresh blueberries.",
        basePrice: 3.0,
        categoryId: 3,
        createdAt: new Date("2023-01-01T00:00:00Z"),
        updatedAt: new Date("2023-06-01T00:00:00Z"),
        // category: {
        //     id: 3,
        //     name: "Cupcakes",
        // },
        // variations: [
        //     {
        //         id: 7,
        //         productId: 4,
        //         name: "Single",
        //         price: 3.0,
        //         stock: 40,
        //         createdAt: new Date("2023-01-01T00:00:00Z"),
        //         updatedAt: new Date("2023-06-01T00:00:00Z"),
        //     },
        //     {
        //         id: 8,
        //         productId: 4,
        //         name: "Dozen",
        //         price: 30.0,
        //         stock: 5,
        //         createdAt: new Date("2023-01-01T00:00:00Z"),
        //         updatedAt: new Date("2023-06-01T00:00:00Z"),
        //     },
        // ],
        images: [
            {
                id: 4,
                productId: 4,
                imageUrl: "/images/products/blueberry-muffin.jpg",
                imagePublicId: "blueberry-muffin",
                createdAt: new Date("2023-01-01T00:00:00Z"),
            },
        ],
        // reviews: [
        //     {
        //         id: 4,
        //         productId: 4,
        //         userId: 4,
        //         rating: 4,
        //         review: "Moist and full of blueberries.",
        //         createdAt: new Date("2023-01-01T00:00:00Z"),
        //         updatedAt: new Date("2023-06-01T00:00:00Z"),
        //         user: {
        //             id: 4,
        //             username: "bob_brown",
        //             email: "bob@example.com",
        //             roleId: 1,
        //         },
        //     },
        // ],
    },
    // {
    //     id: 5,
    //     name: "French Baguette",
    //     description: "A classic French baguette with a crispy crust.",
    //     basePrice: 3.5,
    //     categoryId: 4,
    //     createdAt: new Date("2023-01-01T00:00:00Z"),
    //     updatedAt: new Date("2023-06-01T00:00:00Z"),
    //     category: {
    //         id: 4,
    //         name: "Breads",
    //     },
    //     variations: [
    //         {
    //             id: 9,
    //             productId: 5,
    //             name: "Single",
    //             price: 3.5,
    //             stock: 30,
    //             createdAt: new Date("2023-01-01T00:00:00Z"),
    //             updatedAt: new Date("2023-06-01T00:00:00Z"),
    //         },
    //         {
    //             id: 10,
    //             productId: 5,
    //             name: "Pack of 2",
    //             price: 6.0,
    //             stock: 15,
    //             createdAt: new Date("2023-01-01T00:00:00Z"),
    //             updatedAt: new Date("2023-06-01T00:00:00Z"),
    //         },
    //     ],
    //     images: [
    //         {
    //             id: 5,
    //             productId: 5,
    //             imageUrl: "/images/products/french-baguette.jpg",
    //             imagePublicId: "french-baguette",
    //             createdAt: new Date("2023-01-01T00:00:00Z"),
    //         },
    //     ],
    //     reviews: [
    //         {
    //             id: 5,
    //             productId: 5,
    //             userId: 5,
    //             rating: 5,
    //             review: "Crispy crust and soft inside, perfect!",
    //             createdAt: new Date("2023-01-01T00:00:00Z"),
    //             updatedAt: new Date("2023-06-01T00:00:00Z"),
    //             user: {
    //                 id: 5,
    //                 username: "chris_lee",
    //                 email: "chris@example.com",
    //                 roleId: 1,
    //             },
    //         },
    //     ],
    // },
    // {
    //     id: 6,
    //     name: "Cinnamon Roll",
    //     description: "A sweet roll with cinnamon and icing.",
    //     basePrice: 4.0,
    //     categoryId: 5,
    //     createdAt: new Date("2023-01-01T00:00:00Z"),
    //     updatedAt: new Date("2023-06-01T00:00:00Z"),
    //     category: {
    //         id: 5,
    //         name: "Pastries",
    //     },
    //     variations: [
    //         {
    //             id: 11,
    //             productId: 6,
    //             name: "Single",
    //             price: 4.0,
    //             stock: 25,
    //             createdAt: new Date("2023-01-01T00:00:00Z"),
    //             updatedAt: new Date("2023-06-01T00:00:00Z"),
    //         },
    //         {
    //             id: 12,
    //             productId: 6,
    //             name: "Pack of 4",
    //             price: 14.0,
    //             stock: 10,
    //             createdAt: new Date("2023-01-01T00:00:00Z"),
    //             updatedAt: new Date("2023-06-01T00:00:00Z"),
    //         },
    //     ],
    //     images: [
    //         {
    //             id: 6,
    //             productId: 6,
    //             imageUrl: "/images/products/cinnamon-roll.jpg",
    //             imagePublicId: "cinnamon-roll",
    //             createdAt: new Date("2023-01-01T00:00:00Z"),
    //         },
    //     ],
    //     reviews: [
    //         {
    //             id: 6,
    //             productId: 6,
    //             userId: 6,
    //             rating: 5,
    //             review: "Sweet and delicious, perfect for breakfast!",
    //             createdAt: new Date("2023-01-01T00:00:00Z"),
    //             updatedAt: new Date("2023-06-01T00:00:00Z"),
    //             user: {
    //                 id: 6,
    //                 username: "emma_white",
    //                 email: "emma@example.com",
    //                 roleId: 1,
    //             },
    //         },
    //     ],
    // },
];

