import { API_BASE_URL } from "env";

const API_URL_TICKET_IMPORT = API_BASE_URL;

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
    Lấy danh sách phiếu nhập
**/
export function getListAllTicketImport(){

    return request({
        url: API_URL_TICKET_IMPORT  +  "list-ticketimport",
        method: 'GET'
    });

}


/* ============================
    Lưu nhà cung cấp
**/
export function createTicketImport(ticketImport){

    var raw = JSON.stringify({
        "code": ticketImport.code,
        "supplier": ticketImport.supplier,
        "total_price": ticketImport.total_price,
        "create_by": 1,
        "create_date": new Date(),
        "update_by": 1
      });

    return request({
        url: API_URL_TICKET_IMPORT + 'create-ticket-import',
        method: 'POST',
        body: raw,
        redirect: 'follow'
    });

}

/* ============================
    Cập nhật phiếu nhập
**/
export function updateTicketImport(ticketImport){

    var raw = JSON.stringify({
        "code": ticketImport.code,
        "supplier": ticketImport.supplier,
        "total_price": ticketImport.total_price,
        "create_by": 1,
        "update_date": new Date(),
        "update_by": 1
      });

    return request({
        url: API_URL_SUPPLIER + 'update-ticketimport/' + ticketImport.id,
        method: 'PUT',
        body: raw,
        redirect: 'follow'
    });

}

export function deleteTicketImport(id) {
    return request({
        url: API_BASE + 'delete-ticketimport/' + id,
        method: 'DELETE'
    });
}
// =====================================

// ================= TICKET_IMPORT_DETAL ================
export function createTicketImportDetail(productImport){

    var raw = JSON.stringify({
        "product": productImport.product,
        "quantity": productImport.quantity,
        "ticket_import": productImport.ticket_import,
      });

    return request({
        url: API_URL_TICKET_IMPORT + 'create-ticketdetail',
        method: 'POST',
        body: raw,
        redirect: 'follow'
    });

}
