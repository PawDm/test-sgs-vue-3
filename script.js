const cities = [
  {
    name: 'Moscow',
    shops: [
      {
        name: 'First Shop',
        workers: [
          {
            lastName: 'Ivanov',
          },
          {
            lastName: 'Petrov',
          },
        ],
      },
      {
        name: 'SecondShop',
        workers: [
          {
            lastName: 'Sidorov',
          },
          {
            lastName: 'Kozlov',
          },
        ],
      },
    ],
  },
  {
    name: 'SaintPetersburg',
    shops: [
      {
        name: 'First Shop 1',
        workers: [
          {
            lastName: 'Mamaev',
          },
          {
            lastName: 'Sosnov',
          },
        ],
      },
      {
        name: 'Second Shop 1',
        workers: [
          {
            lastName: 'Сидоров',
          },
          {
            lastName: 'Козлов',
          },
        ],
      },
      {
        name: 'Third Shop 1',
        workers: [
          {
            lastName: 'Mamaev',
          },
          {
            lastName: 'Козлов',
          },
        ],
      },
    ],
  },
  {
    name: 'Kaluga',
    shops: [
      {
        name: 'First Shop 2',
        workers: [
          {
            lastName: 'Максимов',
          },
          {
            lastName: 'Дмитриев',
          },
        ],
      },
      {
        name: 'Second Shop 2',
        workers: [
          {
            lastName: 'Николаев',
          },
          {
            lastName: 'Леонтьев',
          },
        ],
      },
    ],
  },
];

const brigades = ['8:00 - 20:00', '20:00 - 8:00'];
let currentHour = new Date().getHours();
let trigger = getTrigger(currentHour);
let currentBrigade = [];
currentBrigade.push(brigades[trigger]);

const workShifts = ['Первая', 'Вторая'];
const defaultWorkShifts = workShifts[0];

function getTrigger(currentHour) {
  let trigger = 7 < currentHour && currentHour < 20 ? 0 : 1;
  return trigger;
}

function clearCookie() {
  var mydate = new Date();
  mydate.setTime(mydate.getTime() - 1);
  document.cookie = 'CookieForTest=; expires=' + mydate.toGMTString();
}

function setAndSendCookie(forCookie) {
  document.cookie =
    'CookieForTest=' +
    JSON.stringify(forCookie) +
    '; expires=' +
    new Date(Date.now() + 7 * 86400000).toGMTString();
}

Vue.createApp({
  data() {
    return {
      cities: cities,
      request: { city: 0, shop: 0, worker: 0 },
      brigades: currentBrigade,
      selectedBrigades: brigades[trigger],
      workShifts: workShifts,
      selectedWorkShifts: defaultWorkShifts,
    };
  },
  methods: {
    changeCity() {},
    changeShop() {},
    sendCookie() {
      console.log();
      clearCookie();
      let forCookie = [
        { city: this.cities[this.request.city].name },
        { shop: this.cities[this.request.city].shops[this.request.shop].name },
        {
          worker: this.cities[this.request.city].shops[this.request.shop]
            .workers[this.request.worker].lastName,
        },
        { brigades: this.selectedBrigades },
        { workShift: this.selectedWorkShifts },
      ];
      setAndSendCookie(forCookie);
      console.log('Cookie');
    },
  },
  computed: {
    workers: function () {
      if (this.selectedCity != '' && this.selectedShop != '') {
        return this.cities[this.selectedCity][this.selectedShop];
      }
    },
  },
}).mount('#app');
