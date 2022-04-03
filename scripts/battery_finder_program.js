const battery =
    [{
        "batteryName": "WKL-78",
        "capacityAh": 2.3,
        "voltage": 14.4,
        "maxDraw": 3.2,
        "endVoltage": 10,
    },
    {
        "batteryName": "WKL-140",
        "capacityAh": 4.5,
        "voltage": 14.4,
        "maxDraw": 9.2,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-78",
        "capacityAh": 2.5,
        "voltage": 14.5,
        "maxDraw": 10,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-140",
        "capacityAh": 3.6,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 5,
    },
    {
        "batteryName": "IOP-E78",
        "capacityAh": 6.6,
        "voltage": 14.4,
        "maxDraw": 10.5,
        "endVoltage": 8,
    },
    {
        "batteryName": "IOP-E140",
        "capacityAh": 9.9,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 10,
    },
    {
        "batteryName": "IOP-E188",
        "capacityAh": 13.2,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C65",
        "capacityAh": 4.9,
        "voltage": 14.8,
        "maxDraw": 4.9,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C85",
        "capacityAh": 6.3,
        "voltage": 14.4,
        "maxDraw": 6.3,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C140",
        "capacityAh": 9.8,
        "voltage": 14.8,
        "maxDraw": 10,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C290",
        "capacityAh": 19.8,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 12,
    }]
;

const camera =
    [{
        "brand": "Cakon",
        "model": "ABC 3000M",
        "powerConsumptionWh": 35.5,
    },
    {
        "brand": "Cakon",
        "model": "ABC 5000M",
        "powerConsumptionWh": 37.2,
    },
    {
        "brand": "Cakon",
        "model": "ABC 7000M",
        "powerConsumptionWh": 39.7,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9000M",
        "powerConsumptionWh": 10.9,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9900M",
        "powerConsumptionWh": 15.7,
    },
    {
        "brand": "Go MN",
        "model": "UIK 110C",
        "powerConsumptionWh": 62.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 210C",
        "powerConsumptionWh": 64.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 230C",
        "powerConsumptionWh": 26.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 250C",
        "powerConsumptionWh": 15.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 270C",
        "powerConsumptionWh": 20.3,
    },
    {
        "brand": "VANY",
        "model": "CEV 1100P",
        "powerConsumptionWh": 22,
    },
    {
        "brand": "VANY",
        "model": "CEV 1300P",
        "powerConsumptionWh": 23,
    },
    {
        "brand": "VANY",
        "model": "CEV 1500P",
        "powerConsumptionWh": 24,
    },
    {
        "brand": "VANY",
        "model": "CEV 1700P",
        "powerConsumptionWh": 25,
    },
    {
        "brand": "VANY",
        "model": "CEV 1900P",
        "powerConsumptionWh": 26,
    }]
;
class Battery{
    //電池の名前batteryName
    //満充電時の電力容量capacityWh(capacityAh * voltage)
    //終止電圧時の電力容量endCapacityWh(maxDraw * endVoltage)
    constructor(batteryName, capacityWh, endCapacityWh){
        this.batteryName = batteryName;
        this.capacityWh = capacityWh;
        this.endCapacityWh = endCapacityWh;
    }
}
class Finder{
    //Step1で選択されているブランド名
    static SelectedBrand;

    //Step2で選択されているモデル名
    static SelectedModel;

    //Step3に入力されている数値
    static ValueOfStep3 = parseInt(document.getElementById("step3").value);

    //Batteryオブジェクトのリスト(アルファベット順)
    static BatteryObjList = Finder.createBatteryObjectList(battery).sort(function(a,b){
        if(a.batteryName < b.batteryName)return -1;
        if(a.batteryName > b.batteryName)return 1;
        return 0;
    });

    // { ブランド名 : { モデル名 : 消費電力 } }のハッシュマップ
    static BrandHashmap = Finder.createHashmapOfBrand(camera);

    // カメラのリストを受け取り、
    // { ブランド名 : { モデル名 : 消費電力,
    //                 モデル名 : 消費電力
    //                },
    //   ブランド名 : { モデル名 : 消費電力,
    //                 モデル名 : 消費電力
    //                }
    // }
    // のハッシュマップを返す関数
    static createHashmapOfBrand(cameraList){
        let hashmap = {};
        for(let i = 0; i < cameraList.length; i++){
            let currBrand = cameraList[i]["brand"];
            if(!(currBrand in hashmap)){
                hashmap[currBrand] = {};
            }
            hashmap[currBrand][cameraList[i]["model"]] = cameraList[i]["powerConsumptionWh"];
        }
        return hashmap;
    }

    //batteryListを受け取り、Batteryオブジェクトのリストを返す関数
    static createBatteryObjectList(batteryList){
        let res = [];
        for(let i = 0; i < batteryList.length; i++){
            let curr = batteryList[i];
            res.push(new Battery(curr["batteryName"], curr["capacityAh"] * curr["voltage"], curr["maxDraw"] * curr["endVoltage"]));
        }
        return res;
    }

    //選択されているカメラの消費電力とアクセサリーの消費電力を足した値を返す関数
    static getTotalPowerConsumptionOfSelected(){
        let brand = Finder.SelectedBrand;
        let model = Finder.SelectedModel;
        return Finder.BrandHashmap[brand][model] + Finder.ValueOfStep3;
    }
    //Step1からStep4のHTMLを作成する関数
    static createHTMLString(){
        Finder.createStep1HTML();
        Finder.createStep2HTML();
        Finder.createStep3HTML();
        Finder.createStep4HTML();
    }

    //Step1のHTMLを作成する関数
    static createStep1HTML(){
        let step1 = document.getElementById("step1");
        step1.innerHTML = "";
        for(let key in Finder.BrandHashmap){
            //カメラのブランド名のoptionをstep1のセレクトボックスに追加する
            let currOption = document.createElement("option");
            currOption.value = key;
            currOption.innerHTML = key;
            step1.append(currOption);
        }
        //step1の値が変更された時に、変数Finder.SelectedBrandを更新し、step2とstep4のHTMLを更新するイベントリスナーを追加。
        step1.addEventListener("change", function(){
            Finder.SelectedBrand = event.currentTarget.value;
            Finder.createStep2HTML();
            Finder.createStep4HTML();
        });
        step1.options[0].setAttribute("selected", true);
        Finder.SelectedBrand = step1.value;
    }
    //Step2のHTMLを作成する関数
    static createStep2HTML(){
        let step2 = document.getElementById("step2");
        step2.innerHTML = "";
        let currMap = Finder.BrandHashmap[Finder.SelectedBrand];
        for(let key in currMap){
            //カメラのモデル名のoptionをstep2のセレクトボックスに追加する
            let currOption = document.createElement("option");
            currOption.value = key;
            currOption.innerHTML = key;
            step2.append(currOption);
        }
        //step2の値が変更された時に、変数Finder.SelectedModelを更新し、step4のHTMLを更新するイベントリスナーを追加。
        step2.addEventListener("change", function(){
            Finder.SelectedModel = event.currentTarget.value;
            Finder.createStep4HTML();
        });
        step2.options[0].setAttribute("selected", true);
        Finder.SelectedModel = step2.value;
    }
    //Step3のHTMLを作成する関数
    static createStep3HTML(){
        let step3 = document.getElementById("step3");
        //step3の値が変更された時に、変数Finder.ValueOfStep3を更新し、step4のHTMLを更新するイベントリスナーを追加。
        step3.addEventListener("change", function(){
            Finder.ValueOfStep3 = parseInt(event.currentTarget.value);
            Finder.createStep4HTML();
        });
    }
    //Step4のHTMLを作成する関数
    static createStep4HTML(){
        let batteryDiv = document.getElementById("choosedBattery");
        batteryDiv.innerHTML = "";
        //totalPower(カメラの消費電力とアクセサリーの消費電力を足した値)
        let totalPower = Finder.getTotalPowerConsumptionOfSelected();
        for(let i = 0; i < Finder.BatteryObjList.length; i++){
            let curr = Finder.BatteryObjList[i];
            if(curr.endCapacityWh > totalPower){
                let estimatedTime = (Math.round((curr.capacityWh / totalPower) * 10) / 10).toFixed(1);
                let currBatteryHTML = `
                <div class="bg-white rounded border border-secondary d-flex justify-content-between py-2">
                    <div class="col-4 font-weight-bold px-2">${curr.batteryName}</div>
                    <div class="col-4 text-right px-2">Estimate ${estimatedTime} hours</div>
                </div>
                `;
                batteryDiv.innerHTML += currBatteryHTML;
            }
        }
    }
}
//HTMLを作成する
Finder.createHTMLString();
