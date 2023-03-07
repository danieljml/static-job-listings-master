import dataJson from '../data.json' assert { type: 'json' };

const container__jobs = document.querySelector('.container__jobs'),
  container__filter = document.querySelector('.container__filter'),
  filterList = [],
  removeDuplications = array => [...new Set(array)];

const showData = (jobs = dataJson) => {
  const jobItems = jobs
    .map(el => {
      return `
    <div class="job__item">
      <div class="job__info">
        <div class="job__image">
          <img class="img" src="${el.logo}" alt="${el.company}" />
        </div>
        <div class="job__content">
          <div class="job__title">
            <p>${el.company}</p>
            ${el.new ? '<p class="title__new">NEW!</p>' : ''}
            ${el.featured ? '<p class="title__featured">FEATURED</p>' : ''}
          </div>
          <div class="job__position">${el.position}</div>
          <div class="job__extra">
            <p>${el.postedAt}</p>
            <p>${el.contract}</p>
            <p>${el.location}</p>
          </div>
        </div>
      </div>
      <div class="job__details">
        <button id="${el.role}" class="btn job__role">${el.role}</button>
        <button id="${el.level}" class="btn job__level">${el.level}</button>
        ${el.languages
          ?.map(el => {
            return `<button id="${el}" class="btn job__position">${el}</button>`;
          })
          .join(' ')}
      </div>
    </div>    
    `;
    })
    .join('');
  container__jobs.innerHTML = jobItems;
};

const filterData = filters => {
  const languages = ({ languages }) => languages.some(item => filters.includes(item));
  const positions = ({ role }) => filters.includes(role);
  const levels = ({ level }) => filters.includes(level);

  const res = dataJson.filter(item => languages(item) || positions(item) || levels(item));

  return res;
};

const generateFilters = filterList => {
  const filtersItems = removeDuplications(filterList)
    .map(filter => {
      return `
    <div class="filter__item">
      <p class="filter__title">${filter}</p>
      <div class="filter__x">X</div>
    </div>
    `;
    })
    .join('');
  return filtersItems;
};

container__jobs.addEventListener('click', e => {
  if (e.target.classList[0] == 'btn') {
    container__filter.classList.add('active');
    filterList.push(e.target.textContent);

    container__filter.innerHTML = generateFilters(filterList);
    const addingFilters = filterData(removeDuplications(filterList));
    showData(addingFilters);
  }
});

container__filter.addEventListener('click', e => {
  if (e.target.classList[0] == 'filter__x') {
    filterList.pop(e.target.previousElementSibling.textContent);
    container__filter.innerHTML = generateFilters(filterList);

    if (filterList.length) {
      const addingFilters = filterData(removeDuplications(filterList));
      showData(addingFilters);
      return;
    }
    container__filter.classList.remove('active');
    showData();
  }
});

showData();
