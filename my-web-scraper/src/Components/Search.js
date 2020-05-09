import React, { useState } from 'react';
import { goGetThemTiger,getAnotherRequest } from '../Actions/ScrapperActions';
import { Form , Button , Col} from 'react-bootstrap';
import { SearchFormContainer } from './style';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import Spinner from './Spinner';

const Search = (props) => {
    const [type, setType] = useState(0);
    const [maxOwners, setMaxOwners] = useState(0);
    const [minOwners, setMinOwners] = useState(0);
    const [minEngineSize, setMinEngineSize] = useState(0);
    const [maxKilometers, setMaxKilometers] = useState(0);
    const [manufacturer, setManufacturer] = useState(0);
    const [isManuDisabled, setIsManuDisabled] = useState(true);
    const [vehicleModels, setVehicleModels] = useState([]);
    const [vehicleModel, setVehicleModel] = useState(0);
    const [vehicleModelName, setVehicleModelName] = useState('');
    const [vehicleBrandName, setVehicleBrandName] = useState('');
    const [fromYear, setFromYear] = useState(0);
    const [toYear, setToYear] = useState(0);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);


    
    const vehicleType = [
        {label:'בחר סוג רכב', value:0},
        {label:'פרטי',value:'private-cars'},
        {label:'SUV',value:'4X4'},
        {label:'משאיות',value:'trucks'},
        {label:'טנדרים / מסחריות',value:'commercial-cars'},
        {label:'אופנועים',value:'motorcycles'},
    ];

    const owners = [
        {label:'בחר מספרים בעלים', value:0},
        {label:'1',value:'1'},
        {label:'2',value:'2'},
        {label:'3',value:'3'},
        {label:'4',value:'4'},
        {label:'5',value:'4'},
    ];

    const engineSize = [
        {label:'בחר נפח מנוע מינימלי', value:0},
        {label:'1000',value:'1000'},
        {label:'1100',value:'1100'},
        {label:'1200',value:'1200'},
        {label:'1300',value:'1300'},
        {label:'1400',value:'1400'},
        {label:'1500',value:'1500'},
        {label:'1600',value:'1600'},
        {label:'1700',value:'1700'},
        {label:'1800',value:'1800'},
        {label:'1900',value:'1900'},
        {label:'2000',value:'2000'},
        {label:'2100',value:'2100'},
        {label:'2200',value:'2200'},
        {label:'2300',value:'2300'},
        {label:'2400',value:'2400'},
        {label:'2500',value:'2500'},
        {label:'2600',value:'2600'},
        {label:'2700',value:'2700'},
        {label:'2800',value:'2800'},
        {label:'2900',value:'2900'},
        {label:'3000',value:'3000'},
    ];

    const vehicle = [
        {label:'בחר יצרן', value:0},
        {label:'אאודי',value:'1'},
        {label:'`אברת',value:'227'},
        {label:'אופל',value:'5'},
        {label:'אינפיניטי',value:'195'},
        {label:'אלפא רומאי',value:'6'},
        {label:'MG',value:'203'},
        {label:'ב.מ.וו',value:'7'},
        {label:'ביואיק',value:'8'},
        {label:'Jeep/גיפ',value:'296'},
        {label:'דאציה',value:'255'},
        {label:'דודג',value:'11'},
        // {label:'דייהו',value:'12'},
        {label:'דייהטסו',value:'13'},
        {label:'הונדה',value:'14'},
        {label:'וולוו',value:'15'},
        {label:'טויוטה',value:'16'},
        {label:'יגואר',value:'18'},
        {label:'יונדאי',value:'19'},
        // {label:'לאדה',value:'20'},
        {label:'לאנציה',value:'21'},
        {label:'לקסוס',value:'163'},
        {label:'מאזדה',value:'22'},
        {label:'מיני',value:'187'},
        {label:'מיצובישי',value:'23'},
        {label:'מרצדס',value:'24'},
        {label:'ניסאן',value:'25'},
        {label:'סאאב',value:'26'},
        {label:'סאניונג',value:'278'},
        {label:'סובארו',value:'27'},
        {label:'סוזוקי',value:'28'},
        {label:'סיאט',value:'29'},
        {label:'סיטרואן',value:'30'},
        {label:'סמארט',value:'32'},
        {label:'סקודה',value:'31'},
        {label:'פולקסווגן',value:'34'},
        {label:'פונטיאק',value:'35'},
        {label:'פורד',value:'36'},
        {label:'פיאט',value:'37'},
        {label:'פיגו',value:'33'},
        {label:'קאדילק',value:'39'},
        {label:'קיה',value:'40'},
        {label:'קרייזלר',value:'41'},
        {label:'רנו',value:'43'},
        {label:'שברולט',value:'44'},

    ];

    const kilometers = [
        {label:'בחר קילומטראז מקסימלי', value:0},
        {label:'10000',value:'10000'},
        {label:'20000',value:'20000'},
        {label:'30000',value:'30000'},
        {label:'40000',value:'40000'},
        {label:'50000',value:'50000'},
        {label:'60000',value:'60000'},
        {label:'70000',value:'70000'},
        {label:'80000',value:'80000'},
        {label:'90000',value:'90000'},
        {label:'110000',value:'110000'},
        {label:'120000',value:'120000'},
        {label:'130000',value:'130000'},
        {label:'140000',value:'140000'},
        {label:'150000',value:'150000'},
        {label:'160000',value:'160000'},
        {label:'170000',value:'170000'},
        {label:'לא רלוונטי',value:''},
    ];

    const from = [
        {label:'בחר מאיזה שנה', value:0},
        {label:'2020',value:'2020'},
        {label:'2019',value:'2019'},
        {label:'2018',value:'2018'},
        {label:'2017',value:'2017'},
        {label:'2016',value:'2016'},
        {label:'2015',value:'2015'},
        {label:'2014',value:'2014'},
        {label:'2013',value:'2013'},
        {label:'2012',value:'2012'},
        {label:'2011',value:'2011'},
        {label:'2010',value:'2010'},
        {label:'2009',value:'2009'},
        {label:'2008',value:'2008'},
        {label:'2007',value:'2007'},
        {label:'2006',value:'2006'},
        {label:'2005',value:'2005'},
        {label:'2004',value:'2004'},
        {label:'2003',value:'2003'},
        {label:'2002',value:'2002'},
        {label:'2001',value:'2001'},
        {label:'2000',value:'2000'},
        {label:'1999',value:'1999'},
        {label:'1998',value:'1998'},
        {label:'1997',value:'1997'},
        {label:'1996',value:'1996'},
        {label:'1995',value:'1995'},
        {label:'1994',value:'1994'},
        {label:'1993',value:'1993'},
        {label:'1992',value:'1992'},
        {label:'1991',value:'1991'},
        {label:'1990',value:'1990'},
        {label:'1989',value:'1989'},
        {label:'1988',value:'1988'},
        {label:'1987',value:'1987'},
        {label:'1986',value:'1986'},
        {label:'1985',value:'1985'},
        {label:'1984',value:'1984'},
        {label:'1983',value:'1983'},
        {label:'1982',value:'1982'},
        {label:'1981',value:'1981'},
        {label:'1980',value:'1980'},
    ];
    
    const to = [
        {label:'בחר עד שנה', value:0},
        {label:'2020',value:'2020'},
        {label:'2019',value:'2019'},
        {label:'2018',value:'2018'},
        {label:'2017',value:'2017'},
        {label:'2016',value:'2016'},
        {label:'2015',value:'2015'},
        {label:'2014',value:'2014'},
        {label:'2013',value:'2013'},
        {label:'2012',value:'2012'},
        {label:'2011',value:'2011'},
        {label:'2010',value:'2010'},
        {label:'2009',value:'2009'},
        {label:'2008',value:'2008'},
        {label:'2007',value:'2007'},
        {label:'2006',value:'2006'},
        {label:'2005',value:'2005'},
        {label:'2004',value:'2004'},
        {label:'2003',value:'2003'},
        {label:'2002',value:'2002'},
        {label:'2001',value:'2001'},
        {label:'2000',value:'2000'},
        {label:'1999',value:'1999'},
        {label:'1998',value:'1998'},
        {label:'1997',value:'1997'},
        {label:'1996',value:'1996'},
        {label:'1995',value:'1995'},
        {label:'1994',value:'1994'},
        {label:'1993',value:'1993'},
        {label:'1992',value:'1992'},
        {label:'1991',value:'1991'},
        {label:'1990',value:'1990'},
        {label:'1989',value:'1989'},
        {label:'1988',value:'1988'},
        {label:'1987',value:'1987'},
        {label:'1986',value:'1986'},
        {label:'1985',value:'1985'},
        {label:'1984',value:'1984'},
        {label:'1983',value:'1983'},
        {label:'1982',value:'1982'},
        {label:'1981',value:'1981'},
        {label:'1980',value:'1980'},
    ];
    
    
    function handleSelectedType(e){
        setType(e.target.value)
        setManufacturer(0)
        setVehicleModels([])
        setIsManuDisabled(e.target.value == 0)
    }
    
    function handleSelectedMinOwnwers(e){
        setMinOwners(e.target.value)
    }

    function handleSelectedMaxOwnwers(e){
        setMaxOwners(e.target.value)
    }

    function handleSelectedMaxKilometers(e){
        setMaxKilometers(e.target.value)
    }

    function handleSelectedManufacturer(e){
        setManufacturer(e.target.value)
        var index = e.nativeEvent.target.selectedIndex; 
        setVehicleBrandName(e.nativeEvent.target[index].text)
        if(type){
            handleDisplayVehicleModels(e.target.value)
        }
    }

    function handleDisplayVehicleModels(value){
        let modelsByManufacturer;

        switch(value){
            case '1':
                if(type === 'private-cars'){
                    modelsByManufacturer = 
                    [
                        {label:'בחר דגם', value:0},
                        {label:'100',value:'5'},
                        {label:'80',value:'4'},
                        {label:'A1',value:'1687'},
                        {label:'A3',value:'1468'},
                        {label:'A4',value:'1593'},
                        {label:'A5',value:'1270'},
                        {label:'A6',value:'1'},
                        {label:'A7',value:'1792'},
                        {label:'A8',value:'6'},
                        {label:'R8',value:'1433'},
                        {label:'RS3',value:'2941'},
                        {label:'RS5',value:'2942'},
                        {label:'RS6',value:'3035'},
                        {label:'RS7',value:'2903'},
                        {label:'S3',value:'7'},
                        {label:'S4',value:'895'},
                        {label:'S5',value:'1309'},
                        {label:'S6',value:'1252'},
                        {label:'S7',value:'2902'},
                        {label:'S8',value:'910'},
                        {label:'TT',value:'8'},
                        {label:'אולרוד',value:'1272'}
                    ]
                }
                else{
                    modelsByManufacturer = 
                    [
                        {label:'בחר דגם', value:0},
                        {label:'E-tron',value:'3112'},
                        {label:'Q2',value:'2854'},
                        {label:'Q3',value:'1795'},
                        {label:'Q5',value:'1522'},
                        {label:'Q7',value:'982'},
                        {label:'Q8',value:'3083'},
                        {label:'RSQ3',value:'3310'}
                    ]
                }
                break;
                case '5':
                    if(type === 'private-cars'){
                        modelsByManufacturer = 
                        [
                            {label:'בחר דגם', value:0},
                            {label:'אדם',value:'2496'},
                            {label:'אומגה',value:'19'},
                            {label:'אינסיגניה',value:'1734'},
                            {label:'אסטרה',value:'20'},
                            {label:'אסקונה',value:'21'},
                            {label:'גרנדלנד X',value:'3016'},
                            {label:'וקטרה',value:'22'},
                            {label:'זאפירה',value:'23'},
                            {label:'טיגרה',value:'24'},
                            {label:'מוקה',value:'2536'},
                            {label:'מוקה X',value:'2846'},
                            {label:'מריבה',value:'1737'},
                            {label:'קדט',value:'25'},
                            {label:'קורסה',value:'26'},
                            {label:'קסקדה',value:'2461'},
                            {label:'קרוסלנד X',value:'3014'}
                        ]
                    }
                    else{
                        modelsByManufacturer = []
                    }
                    break;
                case '6':
                    if(type === 'private-cars'){
                        modelsByManufacturer = 
                        [
                            {label:'בחר דגם', value:0},
                            {label:'145',value:'27'},
                            {label:'146',value:'28'},
                            {label:'147',value:'29'},
                            {label:'156',value:'30'},
                            {label:'159',value:'1075'},
                            {label:'JTS 159 3.2',value:'2677'},
                            {label:'164',value:'31'},
                            {label:'166',value:'32'},
                            {label:'33',value:'33'},
                            {label:'4C',value:'2484'},
                            {label:'75',value:'34'},
                            {label:'90',value:'35'},
                            {label:'GT',value:'1102'},
                            {label:'GTV',value:'36'},
                            {label:'בררה',value:'1306'},
                            {label:'גוליה',value:'2844'},
                            {label:'גולייטה',value:'1719'},
                            {label:'MITO/מיטו',value:'1557'},
                            {label:'סוד',value:'37'},
                            {label:'ספיידר',value:'38'},
                            {label:'ספרינט',value:'39'},
                        ]
                    }
                    else{
                        modelsByManufacturer = 
                        [
                            {label:'בחר דגם', value:0},
                            {label:'סטלויו',value:'2888'}
                        ]
                    }
                break;
                case '7':
                    if(type === 'private-cars'){
                        modelsByManufacturer = 
                        [
                            {label:'בחר דגם', value:0},
                            {label:'M1',value:'1628'},
                            {label:'M2',value:'2705'},
                            {label:'M3',value:'888'},
                            {label:'M4',value:'2706'},
                            {label:'M5',value:'1008'},
                            {label:'M6',value:'1274'},
                            {label:'M8',value:'3294'},
                            {label:'X1',value:'2569'},
                            {label:'Z3',value:'65'},
                            {label:'Z4',value:'66'},
                            {label:'i3',value:'2837'},
                            {label:'i8',value:'2820'},
                            {label:'סדרה 1',value:'1269'},
                            {label:'סדרה 2',value:'2503'},
                            {label:'סדרה 3',value:'68'},
                            {label:'סדרה 3 קופה / קבריולט',value:'1670'},
                            {label:'סדרה 4',value:'2407'},
                            {label:'סדרה 5',value:'1267'},
                            {label:'סדרה 6',value:'69'},
                            {label:'סדרה 7',value:'1063'},
                            {label:'סדרה 8',value:'1305'}
                        ]
                    }
                    else{
                        modelsByManufacturer = 
                        [ 
                            {label:'בחר דגם', value:0},
                            {label:'X1',value:'1773'},
                            {label:'X2',value:'2965'},
                            {label:'X3',value:'552'},
                            {label:'X4',value:'2526'},
                            {label:'X5',value:'553'},
                            {label:'X6',value:'1343'},
                            {label:'X7',value:'3175'}
                        ]
                    }
                break;
                case '8':
                    if(type === 'private-cars'){
                        modelsByManufacturer = 
                        [
                            {label:'בחר דגם', value:0},
                            {label:'לה סייבר',value:'70'},
                            {label:'לה קרוס',value:'984'},
                            {label:'לוצרן',value:'993'},
                            {label:'סנצורי',value:'71'},
                            {label:'פארק אבניו',value:'73'},
                            {label:'ריביירה',value:'2612'},
                            {label:'ריגל',value:'74'}
                        ]
                    }
                    else{
                        modelsByManufacturer = 
                        [ 
                            {label:'בחר דגם', value:0},
                            {label:'אנקלייב',value:'1351'},
                            {label:'רנדוו',value:'554'},
                        ]
                    }
                break;
                case '11':
                    if(type === 'private-cars'){
                        modelsByManufacturer = 
                        [
                            {label:'בחר דגם', value:0},
                            {label:'אוונגר',value:'1344'},
                            {label:'אספן',value:'78'},
                            {label:'אריס',value:'79'},
                            {label:'גרני',value:'1471'},
                            {label:'גראנד קארוון',value:'2628'},
                            {label:'דארט',value:'80'},
                            // {label:'וייפר',value:'1476'},
                            // {label:'ולי',value:'81'},
                            // {label:'פלימות',value:'82'},
                            {label:'צארגר',value:'1207'},
                            {label:'צלנגר',value:'2511'},
                            {label:'קאליבר',value:'1206'}
                        ]
                    }
                    else{
                        modelsByManufacturer = 
                        [ 
                            {label:'בחר דגם', value:0},
                            {label:'דורנגו',value:'1082'},
                            {label:'ניטרו',value:'1095'},
                        ]
                    }
                break;
                case '13':
                    if(type === 'private-cars'){
                        modelsByManufacturer = 
                        [
                            {label:'בחר דגם', value:0},
                            {label:'YRV',value:'93'},
                            {label:'אפלאוז',value:'94'},
                            {label:'גרנדמוב',value:'95'},
                            {label:'מאטריה',value:'1346'},
                            {label:'סיריון',value:'97'},
                            {label:'קורה',value:'99'},
                            {label:'שרייד',value:'100'},
                            {label:'שרמנט',value:'101'}
                        ]
                    }
                    else{
                        modelsByManufacturer = 
                        [ 
                            {label:'בחר דגם', value:0},
                            {label:'טריוס',value:'96'},
                            {label:'פורזה',value:'566'},
                        ]
                    }
                break;
                case '14':
                    if(type === 'private-cars'){
                        modelsByManufacturer = 
                        [
                            {label:'בחר דגם', value:0},
                            {label:'CR-Z',value:'1680'},
                            {label:'FR-V',value:'1079'},
                            {label:'S2000',value:'102'},
                            {label:'אודיסיי',value:'1454'},
                            {label:'אינסייט',value:'1586'},
                            {label:'אקורד',value:'104'},
                            {label:'גאז',value:'105'},
                            {label:'גאז הייבריד',value:'2673'},
                            {label:'לגנד',value:'107'},
                            {label:'סטרים',value:'1268'},
                            {label:'סיוויק(עד 2006)',value:'109'},
                            {label:'סיוויק TYPE-R',value:'1558'},
                            {label:'סיוויק האצבק החדשה',value:'1559'},
                            {label:'סיוויק הייבריד',value:'1561'},
                            {label:'סיוויק סדאן החדשה',value:'1560'},
                            {label:'סיוויק סטיישן',value:'2500'},
                            {label:'סיוויק קופה/הצבק',value:'1562'},
                            {label:'פרלוד',value:'110'},
                            {label:'שאטל',value:'111'},

                        ]
                    }
                    else{
                        modelsByManufacturer = 
                        [ 
                            {label:'בחר דגם', value:0},
                            {label:'CR-V',value:'567'},
                            {label:'HR-V',value:'568'},
                            {label:'פיילוט',value:'2525'}
                        ]
                    }
                break;
                case '15':
                    if(type === 'private-cars'){
                        modelsByManufacturer = 
                        [
                            {label:'בחר דגם', value:0},
                            {label:'240',value:'113'},
                            {label:'244',value:'114'},
                            {label:'245',value:'115'},
                            {label:'264',value:'116'},
                            {label:'340/345',value:'117'},
                            {label:'740/744',value:'121'},
                            {label:'745',value:'122'},
                            {label:'760',value:'123'},
                            {label:'850',value:'125'},
                            {label:'854',value:'1264'},
                            {label:'855',value:'1666'},
                            {label:'940',value:'128'},
                            {label:'944',value:'1265'},
                            {label:'945',value:'129'},
                            {label:'960',value:'130'},
                            {label:'C30',value:'1277'},
                            {label:'C70',value:'131'},
                            {label:'S40',value:'132'},
                            {label:'S60',value:'133'},
                            {label:'S70',value:'134'},
                            {label:'S80',value:'135'},
                            {label:'S90',value:'136'},
                            {label:'V40',value:'2366'},
                            {label:'הישנה V40',value:'137'},
                            {label:'V50',value:'1278'},
                            {label:'V60',value:'1743'},
                            {label:'V70',value:'138'},
                            {label:'V90 קרוס קאנטרי',value:'3101'},
                            {label:'XC70',value:'909'}
                        ]
                    }
                    else{
                        modelsByManufacturer = 
                        [ 
                            {label:'בחר דגם', value:0},
                            {label:'V40 קרוס קאנטרי',value:'3090'},
                            {label:'V90 קרוס קאנטרי',value:'2874'},
                            {label:'XC40',value:'2973'},
                            {label:'XC60',value:'1584'},
                            {label:'XC70',value:'2558'},
                            {label:'XC90',value:'569'},

                        ]
                    }
                break;
                case '16':
                    if(type === 'private-cars'){
                        modelsByManufacturer = 
                        [
                            {label:'בחר דגם', value:0},
                            {label:'GT86',value:'2360'},
                            {label:'IQ',value:'2678'},
                            {label:'MR2',value:'139'},
                            {label:'אוולון',value:'1673'},
                            {label:'אוולון הייבריד',value:'2614'},
                            {label:'אוונסיס',value:'140'},
                            {label:'אוונסיס ורסו',value:'2548'},
                            {label:'אוריס',value:'1201'},
                            {label:'אוריס הייבריד',value:'2969'},
                            {label:'אייגו',value:'2336'},
                            {label:'ורסו',value:'1654'},
                            {label:'יאריס',value:'1470'},
                            {label:'יאריס הייבריד',value:'2344'},
                            {label:'סולרה קבריולט',value:'1525'},
                            {label:'סטארלט',value:'143'},
                            {label:'סיינה',value:'1092'},
                            {label:'סליקה',value:'144'},
                            {label:'ספייס ורסו',value:'2293'},
                            {label:'פריוויה',value:'2468'},
                            {label:'הייבריד C פריוס',value:'2527'},
                            {label:'פריוס הייבריד',value:'1046'},
                            {label:'פריוס פלוס הייבריד',value:'2376'},
                            {label:'קאמרי',value:'146'},
                            {label:'קורולה',value:'1428'},
                            {label:'RUN-X קורולה',value:'944'},
                            {label:'קורולה הייבריד',value:'3132'},
                            {label:'קרינה',value:'148'},
                        ]
                    }
                    else{
                        modelsByManufacturer = 
                        [ 
                            {label:'בחר דגם', value:0},
                            {label:'4RUNNER',value:'575'},
                            {label:'C-HR',value:'3097'},
                            {label:'קרוזר FJ',value:'1002'},
                            {label:'ארוך RAV4',value:'1516'},
                            {label:'הייבריד RAV4',value:'3114'},
                            {label:'קצר RAV4',value:'573'},
                            {label:'היילנדר',value:'1712'},
                            {label:'LC100 לנד קרוזר',value:'2922'},
                            {label:'V8 לאנד קרוזר',value:'1515'},
                            {label:'לנד קרוזר ארוך',value:'1387'},
                            {label:'לנד קרוזר סדרה 70',value:'1554'},
                            {label:'לנד קרוזר פרדו ארוך',value:'1480'},
                            {label:'לנד קרוזר פרדו קצר',value:'1481'},
                            {label:'לנד קרוזר קצר',value:'574'},
                            {label:'סקויה',value:'1090'},
                        ]
                    }
                break;
                case '18':
                    if(type === 'private-cars'){
                        modelsByManufacturer = 
                        [
                            {label:'בחר דגם', value:0},
                            {label:'F-TYPE',value:'2391'},
                            {label:'S-TYPE',value:'153'},
                            {label:'X-TYPE',value:'154'},
                            {label:'XE',value:'2652'},
                            {label:'XF',value:'1345'},
                            {label:'XJ',value:'1744'},
                            {label:'XJ6',value:'156'},
                            {label:'XJ8',value:'157'},
                            {label:'XJR',value:'1595'},
                            {label:'XK',value:'2469'},
                            {label:'XK8',value:'160'},
                            {label:'XKR',value:'162'},
                        ]
                    }
                    else{
                        modelsByManufacturer = 
                        [ 
                            {label:'בחר דגם', value:0},
                            {label:'E-PACE',value:'2966'},
                            {label:'F-PACE',value:'2766'},
                            {label:'I-PACE',value:'3106'}
                        ]
                    }
                break;
                case '19':
                    if(type === 'private-cars'){
                        modelsByManufacturer = 
                        [
                            {label:'בחר דגם', value:0},
                            {label:'i10',value:'1583'},
                            {label:'i20',value:'1594'},
                            {label:'קרוס i20',value:'2768'},
                            {label:'i25',value:'1726'},
                            {label:'i30',value:'1281'},
                            {label:'i30CW',value:'2347'},
                            {label:'i30N',value:'3126'},
                            {label:'i35',value:'1745'},
                            {label:'i40',value:'2313'},
                            {label:'iX20',value:'1801'},
                            {label:'אטוס',value:'165'},
                            {label:'איוניק',value:'2825'},
                            {label:'אלנטרה 01-07',value:'166'},
                            {label:'אלנטרה +2016',value:'3059'},
                            {label:'אקסנט עד 2012',value:'168'},
                            {label:'אקסנט/i25 החדשה',value:'3131'},
                            {label:'גנסיס',value:'2681'},
                            {label:'גנסיס/G90',value:'2835'},
                            {label:'גטס',value:'169'},
                            {label:'טרגט',value:'1746'},
                            {label:'לנטרה',value:'170'},
                            {label:'מטריקס',value:'1395'},
                            {label:'סונטה',value:'171'},
                            {label:'סונטה הייבריד',value:'3116'},
                            {label:'קופה',value:'172'}
                        ]
                    }
                    else{
                        modelsByManufacturer = 
                        [ 
                            {label:'בחר דגם', value:0},
                            {label:'iX35',value:'1683'},
                            {label:'iX55',value:'1776'},
                            {label:'גאלופר ארוך',value:'1389'},
                            {label:'גאלופר קצר',value:'576'},
                            {label:'וניו',value:'3170'},
                            {label:'טאראקן',value:'577'},
                            {label:'טוסון',value:'578'},
                            {label:'סנטפה פה',value:'579'},
                            {label:'קונה',value:'2946'}
                        ]
                    }
                break;
                case '21':
                    if(type === 'private-cars'){
                        modelsByManufacturer = 
                        [
                            {label:'בחר דגם', value:0},
                            {label:'אפסילון',value:'1799'},
                            {label:'בטה',value:'889'},
                            {label:'דדרה',value:'174'},
                            {label:'דלתא',value:'175'},
                            {label:'פריזמה',value:'176'},
                            {label:'קאפה',value:'177'},
                            {label:'תמה',value:'178'},
                        ]
                    }
                    else{
                        modelsByManufacturer = []
                    }
                break;
            default:
                modelsByManufacturer = []
        }

        setVehicleModels(modelsByManufacturer);
    }

    function handleSelectedVehicleModel(e){
        setVehicleModel(e.target.value);
        var index = e.nativeEvent.target.selectedIndex;
        setVehicleModelName(e.nativeEvent.target[index].text);
    }

    function handleSelectedFromYear(e){
        setFromYear(e.target.value)
    }

    function handleSelectedToYear(e){
        setToYear(e.target.value)
    }

    function handleSelectedMinEngineSize(e){
        setMinEngineSize(e.target.value)
    }

    function resetForm(){
        setManufacturer(0);
        setMaxKilometers(0);
        setMaxOwners(0);
        setMinOwners(0);
        setType(0);
        setVehicleModel(0);
        setVehicleModels([]);
        setIsButtonDisabled(true);
        setFromYear(0);
        setToYear(0);
        setMinEngineSize(0);
    }

    function onSubmit(e){
        e.preventDefault();
        const newScraperData = {
            
            type:type,
            maxOwners:maxOwners,
            minOwners:minOwners,
            kilometers:maxKilometers,
            manufacturer:manufacturer,
            model:vehicleModel,
            fromYear:fromYear,
            toYear:toYear,
            minEngineSize:toYear,
            manufacturerName:vehicleBrandName,
            modelName:vehicleModelName

        }
        resetForm();
        props.goGetThemTiger(newScraperData,props.history);
        props.getAnotherRequest(newScraperData,props.history);
        setTimeout(() => setIsButtonDisabled(false), 5000);
    }
        
        return (
            <SearchFormContainer>
                <div className='welcome-label-container'>
                    <p className='user-name-welcome-label'>הכנס את כל הפרטים הנדרשים והחל חיפוש</p>
                </div>
                <hr class="my-4"/>
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="Form.ControlSelect1">
                        <Form.Label>סוג רכב</Form.Label>
                        <Form.Control as="select"
                        type="text"
                        name="type"
                        value={type}
                        onChange={handleSelectedType}
                        >
                            {vehicleType.map(type =><option key={type.label} value={type.value}>
                                {type.label}
                                </option>)
                                }
                        </Form.Control>
                    </Form.Group>

                    <Form.Row>
                    <Form.Group as={Col} controlId="Form.ControlSelect2">
                        <Form.Label>עד יד</Form.Label>
                        <Form.Control as="select"
                        type="text"
                        name="maxowners"
                        value={maxOwners}
                        onChange={handleSelectedMaxOwnwers}
                        >
                            {owners.map(elem =><option key={elem.label} value={elem.value} disabled={minOwners && parseInt(elem.value) < minOwners}>
                                {elem.label}
                                </option>)
                                }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="Form.ControlSelect2">
                        <Form.Label>יד</Form.Label>
                        <Form.Control as="select"
                        type="text"
                        name="minowners"
                        value={minOwners}
                        onChange={handleSelectedMinOwnwers}
                        >
                            {owners.map(elem =><option key={elem.label} value={elem.value} disabled={maxOwners && parseInt(elem.value) > maxOwners}>
                                {elem.label}
                                </option>)
                                }
                        </Form.Control>
                    </Form.Group>
                    
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="Form.ControlSelect4">
                            <Form.Label>דגם</Form.Label>
                            <Form.Control as="select"
                                disabled={!vehicleModels.length || isManuDisabled}
                                type="text"
                                name="model"
                                value={vehicleModel}
                                onChange={handleSelectedVehicleModel}
                            >
                                {vehicleModels.length && vehicleModels.map(elem =><option key={elem.label} value={elem.value}>
                                    {elem.label}
                                    </option>)
                                    }
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="Form.ControlSelect3">
                            <Form.Label>יצרן</Form.Label>
                            <Form.Control as="select"
                                disabled={isManuDisabled}
                                type="text"
                                name="manufacturer"
                                value={manufacturer}
                                onChange={handleSelectedManufacturer}
                            >
                                {vehicle.map(elem =><option key={elem.label} value={elem.value}>
                                    {elem.label}
                                    </option>)
                                    }
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="Form.ControlSelect5">
                        <Form.Label>נפח מנוע</Form.Label>
                        <Form.Control as="select"
                            type="text"
                            name="minenginesize"
                            value={minEngineSize}
                            onChange={handleSelectedMinEngineSize}
                        >
                            {engineSize.map(elem =><option key={elem.label} value={elem.value}>
                                {elem.label}
                                </option>)
                                }
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="Form.ControlSelect5">
                        <Form.Label>קילומטראז'</Form.Label>
                        <Form.Control as="select"
                            type="text"
                            name="maxkilometers"
                            value={maxKilometers}
                            onChange={handleSelectedMaxKilometers}
                        >
                            {kilometers.map(elem =><option key={elem.label} value={elem.value}>
                                {elem.label}
                                </option>)
                                }
                        </Form.Control>
                    </Form.Group>

                    <Form.Row>
                    <Form.Group as={Col} controlId="Form.ControlSelect7">
                        <Form.Label>עד שנה</Form.Label>
                        <Form.Control as="select"
                        type="text"
                        name="toYear"
                        value={toYear}
                        onChange={handleSelectedToYear}
                        >
                            {to.map(elem =><option key={elem.label} value={elem.value} disabled={fromYear && parseInt(elem.value) < fromYear}>
                                {elem.label}
                                </option>)
                                }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group  as={Col} controlId="Form.ControlSelect6">
                        <Form.Label>משנה</Form.Label>
                        <Form.Control as="select"
                        type="text"
                        name="fromYear"
                        value={fromYear}
                        onChange={handleSelectedFromYear}
                        >
                            {from.map(elem =><option key={elem.label} value={elem.value} disabled={toYear && parseInt(elem.value) > toYear}>
                                {elem.label}
                                </option>)
                                }
                        </Form.Control>
                    </Form.Group>
                    </Form.Row>

                    <Button variant='success' type="submit" disabled={isButtonDisabled}>
                        חפש
                    </Button>
                </Form>
                </SearchFormContainer>
            )
}

Search.propTypes = {
    auth: PropTypes.object.isRequired,
    goGetThemTiger: PropTypes.func,
    getAnotherRequest: PropTypes.func
    };
    
    const mapStateToProps = (state)=>({
    auth:state.auth
    });
    
export default connect(mapStateToProps, { goGetThemTiger, getAnotherRequest})(withRouter(Search));