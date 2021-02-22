# API Endpoints for Online Book Market Place
### Reading Course Assignment - 2  |  Group - 3

__Authors :__ 
_Saumya Bhatt - 2018A3PS0303G_ 
_Aditi Umashankar - 2018AAPS0329G_

---


## USER

### `GET /users/{userId}`

This returns the user profile of a specific user.

#### _Query Parameters_

**userId**
`int`

The ID of the user to be viewed.

#### _Response_

**200**
Returns the user object.

---

### `POST /users`

This creates a new user.

#### _Request Body_

**username** `string`

The username of the new user.

**email** `string`

The email address of the new user.

**password** `string`

The password of the new user.

**phoneNo** `int`

The phone number of the new user.

**locCity** `string`

The city of the new user.

**locState** `string`

The state of the new user.

**image** `string`

File path of the user display picture. (_optional_)

#### _Response_

**201**
Returns the newly created user object.

**500**
Error in signing up.

---

### `PUT /users/{userId}`

This edits the user profile of the currently logged in user.

#### _Query Parameters_

**userId** `string`

The user ID of the currently logged in user.

#### _Request Body_

**username** `string`

The optional modified username of the user.

**email** `string`

The optional modified email address of the new user.

**password** `string`

The optional new password of the new user.

**phoneNo** `int`

The optional modified phone number of the new user.

**locCity** `string`

The optional modified city of the new user.

**locState** `string`

The optional modified state of the new user.

**image** `string`

The optional modified file path of the user display picture.

#### _Response_

**204**
Returns the modified user object.

---

### `GET /users/{userId}/sold`

This gets a list of items sold by the currently logged in user.

#### _Query Parameters_

**userId**
`int`

The user ID of the currently logged in user.

#### _Response_

**200**
Returns a list of pointers to items sold.

```
{
     "item_id" : <int>  // pointing to the item ID
}
```

---

### `GET /users/{userId}/bought`

This gets a list of items bought by the currently logged in user.

#### _Query Parameters_

**userId**
`int`

The user ID of the currently logged in user.

#### _Response_

**200**
Returns a list of pointers to items bought.

```
{
     "item_id" : <int>  // pointing to the item ID
}
```

---

### `DELETE /users/{userId}`

This deletes the account of the currently logged in user.

#### _Query Parameters_

**userId**
`int`

The user ID of the currently logged in user.

#### _Response_

**204**
User successfully deleted.

---

---

## WISHLIST

### `GET /wishlist`

This returns the wishlist of the user.

#### _Response_

**200**
Returns pointers to the items in the user's wishlist.

```
{
     "item_id" : <int>  // pointing to the item ID
}
```

---

### `GET /wishlist/{itemId}`

This returns an item from the wishlist of the user.

#### _Query Parameters_

**itemId**
`int`

The ID of the item to be viewed in the wishlist.

#### _Response_

**200**
Returns the item from the wishlist.

---

### `POST /wishlist/{itemId}`

This adds an item to the wishlist of the user.

#### _Query Parameters_

**itemId**

`int`

The ID of the item to be added to the wishlist

#### _Response_

**201**
Adds the item to the wishlist and returns the item object.

---

### `DELETE /wishlist/{itemId}`

This deletes an item from the wishlist of the user.

#### _Query Parameters_

**itemId**

`int`

The ID of the item to be deleted from the wishlist

#### _Response_

**204**
Item successfully deleted

---

---

## ORDER

### `GET /orders`

This displays all the orders placed by a user.

#### _Response_

**200**
Returns pointers to the items ordered by the user.

```
{
     "item_id" : <int>  // pointing to the item ID
}
```

### `POST /orders/{itemId}`

This places an order for the specified item.

#### _Query Parameters_

**itemId**
`int`

The ID of the item to be ordered.



#### _Response_

**201**
Returns the item that has been ordered.

**500**
Error in placing the order.

---

### `DELETE /orders/{itemId}`

This deletes an order for the specified item.

#### _Query Parameters_

**itemId**
`int`

The ID of the item whose order is to be cancelled.

#### _Response_

**204**
Order successfully cancelled.

---

---

## ITEMS

### `GET /items`

This returns all items available for sale.

#### _Response_

**200**
Returns a pointers to all items available for sale.

---

### `GET /items/cat`

This gets a list of items based on the categories chosen.

#### _Query Parameters_

**year**
`string`

The year for which books are required.

**branch**
`string`

The branch for which books are required.

**includeRef**
`boolean`

Is `true` if reference books are also to be displayed. Default `false`.

#### _Response_

**200**
Returns pointers to the items that fall into the required categories.

---

### `GET /items/{itemId}`

This gets the selected item.

#### _Query Parameters_

**itemId**
`int`

The ID of the item to be viewed.

#### _Response_

**200**
Returns the item selected.

---

### `POST /items`

This adds an item to the marketplace for sale.

#### _Request Body_

**name**
`string`

The name of the book.

**author**
`string`

The author of the book.

**edition**
`string`

The book edition. (_optional_)

**images**
`string`

File paths to the images to be uploaded.

**remarks**
`string`

Remarks about the item by the seller.

**year**
`string`

The year this book is for. If OTHERS, the item is categorised as a reference book.

**branch**
`string`

The branch this book belongs to.

#### _Response_

**201**
Returns the item now posted in the marketplace.

---

### `PUT /items/{itemId}`

This modifies an item listing.

#### _Query Parameters_

**itemId**
`int`

The ID of the item to be modified.

#### _Request Body_

**name**
`string`

The optional modified name of the book.

**author**
`string`

The optional modified author of the book.

**edition**
`string`

The optional modified book edition.

**images**
`string`

The optional modified file paths to the images to be uploaded.

**remarks**
`string`

The optional modified remarks about the item by the seller.

**year**
`string`

The optional modified year this book is for. If OTHERS, the item is categorised as a reference book.

**branch**
`string`

The optional modified branch this book belongs to.

#### _Response_

**204**
The item was successfully updated.

---

### `DELETE /items/{itemId}`

This deletes an item lsited for sale.

#### _Query Parameters_

**itemId**
`int`

The ID of the item that is supposed to be deleted.

#### _Response_

**204**
Item successfully deleted.

---

---
