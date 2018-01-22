# sensorServer

## 一份简单的api文档

服务器接受两种表单编码的post请求，即一般的`application/x-www-form-urlencoded`以及`application/json`，两种都为`utf-8`编码。

>关于数据库的详细信息见总群中相关文档。

参考代码:

具体文件在`/example`目录下。

1. java
    ```java
    JSONObject  obj = new JSONObject();
    JSONArray cols = new JSONArray();
    JSONArray idxs = new JSONArray();
    // 填写你的cols和idxs
    {
        JSONObject kv = (new KeyValue("你的key","你的value")).getKv();
        cols.put(kv);
        idxs.put((new KeyValue("你的key","你的value")).getKv());
        idxs.put((new KeyValue("你的key","你的value")).getKv());
    }
    obj.put("cols", cols);
    obj.put("idxs", idxs);
    ```
1. js
    * 基于vue.js
        ```html
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <script src="https://unpkg.com/vue/dist/vue.js"></script>
            <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
            <script src="https://unpkg.com/vue-resource/dist/vue-resource.js"></script>
            <title>Document</title>
        </head>

        <body>
            <div class='db'>
                <button v-on:click='selectALL()'>{{btn}}</button>
            </div>

            <script>
                var app = new Vue({
                    el: '.db',
                    data: {
                        btn: 'selectALL'
                    },
                    methods: {
                        selectALL: function () {
                            var obj = {
                                cols: [
                                    {
                                        key: 'car_id',
                                        value: 3
                                    },
                                    {
                                        key: 'driver',
                                        value: 3
                                    },
                                    {
                                        key: 'longitude',
                                        value: 3
                                    },
                                    {
                                        key: 'latitude',
                                        value: 3
                                    },
                                    {
                                        key: 'fleet',
                                        value: 3
                                    },
                                    {
                                        key: 'manager_id',
                                        value: 3
                                    },
                                    {
                                        key: 'manager_phone',
                                        value: 3
                                    },
                                    {
                                        key: 'driver_phone',
                                        value: 3
                                    },
                                    {
                                        key: 'condition',
                                        value: 3
                                    },
                                    {
                                        key: 'location',
                                        value: 3
                                    }
                                ],
                                idxs: [
                                    {
                                        key: 'car_id',
                                        value: 3
                                    }
                                ]
                            };
                            this.$http.post('http://localhost:3000' + '/car' + '/select', obj, { emulateJSON: false }).then((res) => {
                                // 连接访问正常的响应，返回数据在res.body中。
                                console.log(res.body);
                            }, (err) => {
                                // 错误处理
                            });
                        }
                    }
                })
            </script>
        </body>

        </html>
        ```