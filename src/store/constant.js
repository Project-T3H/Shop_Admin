// theme constant
export const gridSpacing = 3;
export const drawerWidth = 260;
export const appDrawerWidth = 320;
export const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
}

export const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return (
        [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-') +
        ' ' +
        [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            padTo2Digits(date.getSeconds()),
        ].join(':')
    );
}

export const converToPrice = (price) => {
    return new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'VND'
      }).format(price);
    
}