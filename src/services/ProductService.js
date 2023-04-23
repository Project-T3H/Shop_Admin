const { API_BASE_URL } = require("env")

const API_BASE = API_BASE_URL;

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);
    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if (!response.ok) {
                return Promise.reject(json);
            }

            return json;
        })
    );
};

const requestUploadFile = (options) => {
    const headers = new Headers();

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);
    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if (!response.ok) {
                return Promise.reject(json);
            }

            return json;
        })
    );
};

// ==============================================================
// ======================= SUPPLIER =============================

// Hiển thị danh sách các Supplier
export function getListSupplier() {
    return request({
        url: API_BASE + 'list-supplier',
        method: 'GET'
    })
}

// ==============================================================
// ========================= PRODUCT ============================

// Hiển thị danh sách sản phẩm
export function getlistProduct() {
    return request({
        url: API_BASE + 'list-product',
        method: "GET"
    })
}

// Lấy thông tin sản phẩm theo id
export function getProductById(id) {
    return request({
        url: API_BASE + 'product-by-id/' + id,
        method: "GET"
    })
}

// Tạo một sản phẩm mới
export function createProduct(product) {
    
    var formData = new FormData();
    formData.append("product_name", product.product_name)
    formData.append("price", product.price)
    formData.append("sale", product.sale)
    formData.append("description", product.description)
    formData.append("content", product.content)
    formData.append("branch", product.branch)
    formData.append("category", product.category)
    formData.append("create_by", 1)
    formData.append("update_by", 1)
    formData.append("create_date", new Date())
    formData.append("image", product.image)

    return requestUploadFile({
        url: API_BASE + "create-product",
        body: formData,
        method: 'POST',
        redirect: 'follow'
    })
}

// Cập nhật thông tin sản phẩm mới
export function updateProduct(product) {
    var formData = new FormData();
    formData.append("product_name", product.product_name)
    formData.append("price", product.price)
    formData.append("sale", product.sale)
    formData.append("description", product.description)
    formData.append("content", product.content)
    formData.append("branch", product.branch)
    formData.append("category", product.category)
    formData.append("create_by", 1)
    formData.append("update_by", 1)
    formData.append("create_date", new Date())
    formData.append("image_product", product.image_product)

    return requestUploadFile({
        url: API_BASE + "update-product/" + product.id,
        body: formData,
        method: 'PUT',
        redirect: 'follow'
    })
}


// Xóa thông tin sản phẩm
export function deleteProduct(product) {
    return request({
        url: API_BASE + "delete-product/" + product.id,
        method: 'DELETE'
    })
}

// ==============================================================


// ==============================================================
// ========================= IMPORT =============================

// Tạo mới thông tin phiếu nhập hàng
export function createImport(imports) {
    var raw = JSON.stringify({
        "code": imports.code,
        "supplier": imports.supplier,
        "total_price": imports.total_price
    });

    return request({
        url: API_BASE + "create-import",
        method: "POST",
        body: raw,
        redirect: "follow"
    });
}

// Cập nhật thông tin phiếu nhập hàng
export function updateImport(imports) {
    var raw = JSON.stringify({
        "code": imports.code,
        "supplier_code": imports.supplier_code,
        "total_price": imports.total_price
    });

    return request({
        url: API_BASE + "update-import/" + imports.id,
        method: "PUT",
        body: raw,
        redirect: "follow"
    });
}

// Hiển thị danh sách phiếu nhập hàng
export function getlistImport() {
    return request({
        url: API_BASE + "list-import",
        method: "GET"
    })
}


// Xóa phiếu nhập hàng
export function deleteImport(imports) {
    return request({
        url: API_BASE + "delete-import/" + imports.id,
        method: "DELETE"
    })
}

// ==============================================================


// ==============================================================
// ========================== SALES =============================

// Tạo mới mã sales
export function createSales(sales) {
    var raw = JSON.stringify({
        'sale_code': sales.sale_code,
        'sales': sales.sales,
        'date_sale': sales.date_sale,
        'finish_sale': sales.finish_sale,
        'product': sales.product
    });

    return request({
        url: API_BASE + 'create-sale',
        method: 'POST',
        body: raw,
        redirect: 'follow'
    });
}


// Cập nhật thông tin sales
export function updateSale(sales) {
    var raw = JSON.stringify({
        'sale_code': sales.sale_code,
        'sales': sales.sales,
        'date_sale': sales.date_sale,
        'finish_sale': sales.finish_sale,
        'product': sales.product
    });

    return request({
        url: API_BASE + 'update-sale/' + sales.id,
        method: 'PUT',
        body: raw,
        redirect: 'follow'
    });
}

// Hiển thị ra danh sách các mã sales
export function getListSales() {
    return request({
        url: API_BASE + 'list-sales',
        method: 'GET'
    })
}

// Xóa các mã sale
export function deleteSales(sales) {
    return request({
        url: API_BASE + 'delete-sale/' + sales.id,
        method: 'DELETE'
    })
}

// ==============================================================