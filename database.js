import mysql from 'mysql2'
import CryptoJS from 'crypto-js'

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'root',
    database:'baiTH5'
}).promise()


// Khi them thanh cong hash o tang front-end
export const checkUser = async (username,password) =>{
    const hshPwd = CryptoJS.SHA256(password).toString();
    const res = await pool.query("select * from users where username = ? and password = ?",[username,password])
    return {status : true, message: res[0].length > 0};
}

export const getUser = async (username) =>{
    const res = await pool.query("select distinct * from users where username = ?",[username]);
    return {status : true, message: res[0][0]};
}

export const createUser = async(username,password,imgUri) =>{
    try{
        const hshPwd = CryptoJS.SHA256(password).toString();
        const res = await pool.query("insert into users(username,password,imgUri) values (?,?,?) ",[username,password,imgUri]);
        return getUser(username);
    }
    catch{
        return {
            status: false,
            message:"user ton tai"
        };
    }

}
export const udpateUser = async (username,password) =>{
    const hshPwd = CryptoJS.SHA256(password).toString();
    const res = await pool.query("update users set password = ? where username = ? ",[password,username])
    return {status : true, message: true};
}

export const deleteUser = async (username) =>{
    await pool.query("delete from users where username = ?",[username]);
    return {status : true, message: true};
}

// const res = await createUser('hegoplay','fds','gadasf.png');

// console.log(res)
