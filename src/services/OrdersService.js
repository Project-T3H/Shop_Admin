import { API_BASE_URL } from "env";

const API_URL_ORDERS = API_BASE_URL;

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    // if(localStorage.getItem('accessToken')) {
    //     headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'))
    // }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

/* ============================
    Lấy danh đơn hàng
**/
export function getListAllOrders(){

    return request({
        url: API_URL_ORDERS + 'list-orders',
        method: 'GET'
    });

}

// =====================
// Chi tiết đơn hàng

export function getListAllOrderItem(id){

    return request({
        url: API_URL_ORDERS + 'list-orderdetailbyid/' + id,
        method: 'GET'
    });

}

// Cập nhật duyệt đơn hàng
export function approvedOrder(orders){

    var raw = JSON.stringify({
        "order_code": orders.order_code,
        "phone": orders.phone,
        "email": orders.email,
        "address": orders.address,
        "total_price": orders.total_price,
        "status": 1
      });

    return request({
        url: API_URL_ORDERS + 'update_order/' + orders.id,
        method: 'PUT',
        body: raw,
        redirect: 'follow'
    });

}