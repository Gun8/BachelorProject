import React from 'react';
import getJSON from "./getJSON";
import { saveAs } from 'file-saver';

const exportData = (url, name) => {
    function s2ab(s) {
        let buf = new ArrayBuffer(s.length);
        let view = new Uint8Array(buf);
        for (let i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

    getJSON(url)
        .then(res => {
            saveAs(new Blob([s2ab(res.data)],{type:"application/octet-stream"}), name + '.xlsx');
        });
};

export default exportData;