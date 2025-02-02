const { db, ref, set, get, child } = require('../models/database');
const { auth } = require('../models/auth');

class CartService {
    cart = async () => {
        const uid = await auth.currentUser.uid;
        const dbRef = ref(db, `carts/${uid}`);
        return new Promise((resolve, reject) => {
            get(dbRef)
            .then(async (snapshot) => {
                if (snapshot.exists()) {
                    const products = snapshot.val()
                    var result = [];
                    for (let product of products) {
                        const { color, memorysize } = product;
                        const snapshot = await get(ref(db, `products/${product.productId}`))
                        if(snapshot.exists()) {
                            const name = await snapshot.child('name').val();
                            const price = await snapshot.child('price').val();
                            const total = await snapshot.child('inventory').val();
                            const inventory = total[color][memorysize];
                            result.push({
                                status: true,
                                ...product,
                                name: name,
                                price: price,
                                inventory: inventory,
                                total: total
                            })
                        }
                        else {
                            result.push({ status: false, ...product });
                        }
                    }
                    resolve(result);
                } else {
                    resolve(null);
                }
            })
            .catch((error) => reject(error));
        });
    }

    addToCart = async (productInfo) => {
        const uid = await auth.currentUser.uid;
        const { productId, quantity, color, memorysize } = productInfo;
        var data = [];
        var found = false;
        
        return new Promise((resolve, reject) => {
            try {
                get(child(ref(db), `carts/${uid}`))
                .then((snapshot) => {
                    if(snapshot.exists() && snapshot.val() != "") {
                        const obj = Object.values(snapshot.val());
                        data = obj.map((item) => {
                            if(item.productId === productId && item.color === color && item.memorysize === memorysize) {
                                found = true;
                                item.quantity += quantity;
                                return item;
                            }
                            return item;
                        });
                        if(!found) data.unshift(productInfo);
                        set(ref(db, `/carts/${uid}`), data);
                        resolve({status: true, size: data.length})
                    }
                    else {
                        set(ref(db, `/carts/${uid}`), [productInfo]);
                        resolve({status: true, size: 1})
                    }
                })
                .catch((error) => {
                    // resolve({status: false, error: error});
                    reject(error);
                });
            }
            catch (error) { 
                reject(error);
            }
        })
    }
    
    updateQuantity = async (body) => {
        const uid = await auth.currentUser.uid;
        const { index, newQuantity } = body;
        return new Promise((resolve, reject) => {
            get(ref(db, `carts/${uid}/${index}`))
            .then(async (snapshot) => {
                const data = snapshot.val();
                const productRef = ref(db, `products/${data.productId}/inventory/${data.color}/${data.memorysize}`)
                const inventory = (await get(productRef)).val();
                if(newQuantity <= 0) {
                    resolve({status: false, message: "Số lượng không hợp lệ"});
                }
                else if(newQuantity <= inventory) {
                    set(ref(db, `carts/${uid}/${index}/quantity`), newQuantity);
                    resolve({status: true, message: "Đã cập nhật số lượng"});
                }
                else resolve({status: false, message: "Quá số lượng tồn kho"});
            })
            .catch((error) => {
                reject(error);
            });
        })
    }

    remove = async (body) => {
        const uid = await auth.currentUser.uid;
        const { index } = body;
        // console.log(index)
        return new Promise((resolve, reject) => {
            get(child(ref(db), `carts/${uid}`))
            .then((snapshot) => {
                var data = Object.values(snapshot.val());
                // console.log(data)
                data.splice(index, 1);
                set(ref(db, `carts/${uid}`), data);
                resolve({status: true})
            })
            .catch((error) => {
                reject(error);
            });
        })
    }

}

module.exports = new CartService
