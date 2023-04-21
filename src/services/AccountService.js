const { API_BASE_URL } = require("env");

const API_URL_ACC = API_BASE_URL;

const request = async (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);

    const response = await fetch(options.url, options);
    const json = await response.json();
    if (!response.ok) {
        return Promise.reject(json);
    }
    return json;
};

// Lấy danh sách các khách hàng
export function getListCustomer() {
    return request({
        url: API_URL_ACC + "list-customer",
        method: 'GET'
    })
}

// Tạo mới khách hàng
export function createCustomer(customer) {
    const date = (new Intl.DateTimeFormat('en-US').format(new Date(customer.date))).split("/");
    const date1Str = date[0] < 10 ? '0' + date[0] : date[0];
    const date2Str = date[1] < 10 ? '0' + date[1] : date[1];
    const date3Str = date[2] < 10 ? '0' + date[2] : date[2];
    const dateStr = date3Str + '-' + date1Str + '-' + date2Str;
    var raw = JSON.stringify({
        'username': customer.username,
        'customer_code': customer.customer_code,
        'code_tax': customer.code_tax,
        'phone': customer.phone,
        'email': customer.email,
        'gender': customer.gender,
        'date': dateStr,
        'address': customer.address,
        'province': customer.province,
        'district': customer.district,
        'wards': customer.wards,
        'type': customer.type,
        'company_name': customer.company_name,
        // 'image': customer.image
    })

    return request({
        url: API_URL_ACC + "create-customer",
        method: "POST",
        body: raw,
        redirect: 'follow'
    })
}

// Cập nhật Customer
export function updateCustomer(customer) {
    const date = (new Intl.DateTimeFormat('en-US').format(new Date(customer.date))).split("/");
    const date1Str = date[0] < 10 ? '0' + date[0] : date[0];
    const date2Str = date[1] < 10 ? '0' + date[1] : date[1];
    const date3Str = date[2] < 10 ? '0' + date[2] : date[2];
    const dateStr = date3Str + '-' + date1Str + '-' + date2Str;
    var raw = JSON.stringify({
        'username': customer.username,
        'customer_code': customer.customer_code,
        'code_tax': customer.code_tax,
        'phone': customer.phone,
        'email': customer.email,
        'gender': customer.gender === 0 ? true : false,
        'date': dateStr,
        'address': customer.address,
        'province': customer.province,
        'district': customer.district,
        'wards': customer.wards,
        'type': customer.type,
        'company_name': customer.company_name,
        'image': customer.image,
        'note': customer.note,
        'password': customer.password
    });

    return request({
        url: API_URL_ACC + "update-customer/" + customer.id,
        method: "PUT",
        body: raw,
        redirect: 'follow'
    });
}

// Xóa các customer
export function deleteCustomer(customer) {
    return request({
        url: API_URL_ACC + "delete-customer/" + customer.id,
        method: 'DELETE'
    });
}

// ====================================================================



// ====================================================================
// ============================ USER ==================================

// Tạo mới danh sách user
export function createUser(user) {
    const date = (new Intl.DateTimeFormat('en-US').format(new Date(user.date))).split("/");
    const date1Str = date[0] < 10 ? '0' + date[0] : date[0];
    const date2Str = date[1] < 10 ? '0' + date[1] : date[1];
    const date3Str = date[2] < 10 ? '0' + date[2] : date[2];

    const dateStr = date3Str + '-' + date1Str + '-' + date2Str;
    var raw = JSON.stringify({
        'username': user.username,
        'code': user.code,
        'phone': user.phone,
        'email': user.email,
        'gender': user.gender,
        'date': dateStr,
        'address': user.address,
        'province': user.province,
        'district': user.district,
        'wards': user.wards,
        'note': user.note,
        // 'image': user.image,
    })

    return request({
        url: API_URL_ACC + "create-user",
        method: "POST",
        body: raw,
        redirect: 'follow'
    })
}

// Lấy danh sách các user
export function getListUser() {
    return request({
        url: API_URL_ACC + "list-manage",
        method: "GET"
    })
}

// Cập nhật tài khoản user
export function updateUser(user) {
    const date = (new Intl.DateTimeFormat('en-US').format(new Date(user.date))).split("/");
    const date1Str = date[0] < 10 ? '0' + date[0] : date[0];
    const date2Str = date[1] < 10 ? '0' + date[1] : date[1];
    const date3Str = date[2] < 10 ? '0' + date[2] : date[2];
    const dateStr = date3Str + '-' + date1Str + '-' + date2Str;
    var raw = JSON.stringify({
        'username': user.username,
        'code': user.code,
        'phone': user.phone,
        'email': user.email,
        'gender': user.gender === 0 ? true : false,
        'date': dateStr,
        'address': user.address,
        'province': user.province,
        'district': user.district,
        'wards': user.wards,
        'note': user.note,
        // 'image': user.image,
        'password': user.password
    });

    return request({
        url: API_URL_ACC + "update-user/" + user.id,
        body: raw,
        method: "PUT",
        redirect: 'follow'
    });
}

// Xóa tài khoản user
export function deleteUser(user) {
    return request({
        url: API_URL_ACC + "delete-user/" + user.id,
        method: 'DELETE'
    });
}