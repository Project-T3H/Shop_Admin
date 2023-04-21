import { API_BASE_URL } from "env";

const API_URL_BRANCH = API_BASE_URL;

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
    Lấy danh nhãn hàng
**/
export function getListAllBranch(){

    return request({
        url: API_URL_BRANCH + 'list-branch',
        method: 'GET'
    });

}

// =====================

/* ===========================
    Lưu nhãn hàng
**/
export function createBranch(branch){
    var raw = JSON.stringify({
        "branch_name": branch.branch_name,
        "create_by": 1,
        "update_by": 1,
        "create_date": new Date()
      });

    return request({
        url: API_URL_BRANCH + 'create-branch',
        method: 'POST',
        body: raw,
        redirect: 'follow'
    });
}

/* ===========================
    Xóa nhãn hàng
**/
export function deleteBranch(id){

    return request({
        url: API_URL_BRANCH + 'delete-branch/' + id,
        method: 'DELETE',
        redirect: 'follow'
    });
}


/* ===========================
    Cập nhật nhãn hàng
**/
export function updateBranch(branch){

    var raw = JSON.stringify({
        "branch_name": branch.branch_name,
        "create_by": 1,
        "update_by": 1,
        "update_date": new Date()
      });

    return request({
        url: API_URL_BRANCH + 'update-branch/' + branch.id,
        method: 'PUT',
        body: raw,
        redirect: 'follow'
    });
}

// =====================