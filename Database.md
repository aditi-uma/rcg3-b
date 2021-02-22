# Database Schema for Online Book Market Place
### Reading Course Assignment - 2  |  Group - 3

__Authors :__ 
_Saumya Bhatt - 2018A3PS0303G_ 
_Aditi Umashankar - 2018AAPS0329G_

__Database Type :__ _NoSQL (MongoDB)_

---

## Introduction

Three main tables constitue this database. The `USER` table stores the list of all the users that have been created. The nodes within this table points to the node ID of the items that the user has put up for sale, bought or bookmarked. 

The `ITEMS` table lists all the items that have been put up for sale in the marketplace. The items when put up for sale initially have status __0__ meaning open for circulation and would be shown in the market place. Once sold, status changed to __1__ meaning sold and would no longer be shown on the main marketplace (would still be visible in the complimentary user's `sold_items`/`bought_items`).

The `CAEGORY` table serves 2 purposes. First is to effectively point to the items according to any filters that the user uses. Second is to create the Bundles package as shown in the wireframe design.

---

## USER Table

This node would be incremented as and when a new user has been created. Apart from housing basic information about the user, would have nested nodes pointing to the item'd ID that the user has bookmarked (`wishlist_items`), sold (`sold_items`) or bought (`bought_items`).

```
USERS : [
    {
        "id"            : <int>,                // auto-incremented when every user created
        "username"      : <string>,             // length - min 6 | unique
        "email"         : <string>,
        "profile_img"   : <blob>,               // optional
        "password"      : <string>,
        "phone_number"  : <int>,
        "location_city" : <string>
        "location_state": <string>,
        "wishlist_items": [                     // node, containing node ID of the item that has been bookmarked
            { "item_id": <string> }
        ],
        "sold_items" : [                        // node, containing node ID of the item that has been sold by the user
            {
                "item_id"   : <string>,
                "buyer_id"  : <string>,
                "time_stamp": <datetime>
            }
        ],
        "bought_item" : [                       // node, containing node ID of the item that has been bought by the user
            {
                "item_id"   : <string>,
                "seller_id" : <string>,
                "time_stamp": <datetime>
            }
        ]
    }
]
```

---

## ITEMS Table

Would house all the items that have been put up on the market place. Each item contains only one book and all the information related to it. Can hold multiple images of the book in the node `book_img`. Only defined seller here as the complimentary buyer ID pointed in the `USER.id` of that user's bought_item node.

```
ITEMS : [
    {
        "id"          : <int>                           // auto incremented 
        "book_name"   : <string>,
        "book_author" : <string>,
        "book_edition": <string>,                       // optional
        "book_img"    : [                               // can contain multiple images
            { "img": <blob> }
        ],
        "book_price": <float>,
        "remarks"   : <string>,
        "seller"    : <int>,
        "created_at": <datetime>,
        "status"    : <int> { default : 0 }               // 0-> open for citculation | 1-> sold
    }
]
```

---

## CATEGORY Table

Houses all the books categorically. Shall be used only for filtering search. At the **post** page, once the user gives all the data about the book, it shall be added to the `ITEMS` table. The ID of that node along with the information about branch/year would be stored into this table accordingly. 

```
CATEGORY : [
    "FIRST" : [ 
        { "item_id" : <int> }                   // First year common to all
    ],
    "HUM" : [
        { "item_id" : <int> }
    ]
    "EE" : [                                    
        "EEE" : [
            "year_3" : [ { "item_id" : <int> } ],
            "year_4" : [ { "item_id" : <int> } ]
        ],
        "ECE" : [
            "year_3" : [ { "item_id" : <int> } ],
            "year_4" : [ { "item_id" : <int> } ]
        ],
        "ENI" : [
            "year_3" : [ { "item_id" : <int> } ],
            "year_4" : [ { "item_id" : <int> } ]
        ],
        "YEAR_2" : [ { "item_id" : <int> } ],       // 2nd year common for EE
        "OTHERS" : [ { "item_id" : <int> } ]        // reference books
    ],
    "CS" : [
        "year_2" : [ { "item_id" : <int> } ],
        "year_3" : [ { "item_id" : <int> } ],
        "year_4" : [ { "item_id" : <int> } ],
        "OTHERS" : [ { "item_id" : <int> } ]    // reference books
    ],
    "MECH" : [
        "year_2" : [ { "item_id" : <int> } ],
        "year_3" : [ { "item_id" : <int> } ],
        "year_4" : [ { "item_id" : <int> } ],
        "OTHERS" : [ { "item_id" : <int> } ]    // reference books
    ],
    "CHEM" : [
        "year_2" : [ { "item_id" : <int> } ],
        "year_3" : [ { "item_id" : <int> } ],
        "year_4" : [ { "item_id" : <int> } ],
        "OTHERS" : [ { "item_id" : <int> } ]    // reference books
    ],
    "MATH" : [
        "year_2" : [ { "item_id" : <int> } ],
        "year_3" : [ { "item_id" : <int> } ],
        "year_4" : [ { "item_id" : <int> } ],
        "OTHERS" : [ { "item_id" : <int> } ]    // reference books
    ],
    "ECO" : [
        "year_2" : [ { "item_id" : <int> } ],
        "year_3" : [ { "item_id" : <int> } ],
        "year_4" : [ { "item_id" : <int> } ],
        "OTHERS" : [ { "item_id" : <int> } ]    // reference books
    ],
    "PHY" : [
        "year_2" : [ { "item_id" : <int> } ],
        "year_3" : [ { "item_id" : <int> } ],
        "year_4" : [ { "item_id" : <int> } ],
        "OTHERS" : [ { "item_id" : <int> } ]    // reference books
    ],
    "BIO" : [
        "year_2" : [ { "item_id" : <int> } ],
        "year_3" : [ { "item_id" : <int> } ],
        "year_4" : [ { "item_id" : <int> } ],
        "OTHERS" : [ { "item_id" : <int> } ]    // reference books
    ],
]
```

---

**Note** : Filtering by location would require replicating the items array that we would get after apply the primary filters (branch. year). Once we have that array, it would have to be filtered by referencing it the query parameter: location with each location of the items within that array (`item_id.seller.location_city`). 