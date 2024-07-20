function takeInfoHP()
{
    const URL_API = "https://hp-api.herokuapp.com/api/characters";
    const DICT_COLOR = 
    {
        "black":"Черный", 
        "dark":"Темный", 
        "brown":"Коричневый", 
        "red":"Красный", 
        "yellow":"Желтый", 
        "green":"Зеленый", 
        "purple":"Фиолетовый",
        "blond":"Блондинка", 
        "blonde":"Блондин",
        "blue":"Синий",
        "grey":"Серый",
        "silver":"Серебряный",
        "Scarlet":"Алый",
        "bald":"Лысый"

    };
    const COUNT_COLUMN = 3;
    let responce = $.getJSON(URL_API, (data) =>{
        let N = data.length/COUNT_COLUMN;
        for(let j = 0; j < N; j++)
        {
            // row
            let row = document.createElement("div");
            $(row).addClass("row mt-5 justify-content-around");
            document.body.getElementsByClassName("container")[0].appendChild(row);

            for (let i = 0; i < COUNT_COLUMN; i++)
            {
                if(typeof(data[j * 3 + i]) == "undefined")  break; // Если информации нет, значит мы прошли все объекты API
                // card
                let card = document.createElement("div"); 
                $(card).addClass("card"); // add css class for element
                card.style.width = "18rem"; // add style property width
                row.appendChild(card); // add element like child for element row
                // image
                if (typeof(data[j * 3 + i].image) != undefined && data[j * 3 + i].image != "")
                {
                    let imgElement = document.createElement("img");
                    $(imgElement).addClass("card-img-top");
                    card.appendChild(imgElement);
                    imgElement.setAttribute("src", data[j * 3 + i].image);
                }
                // cardBody
                let cardBody = document.createElement("div");
                $(cardBody).addClass("card-body");
                card.appendChild(cardBody);
                // name
                let cardTitle = document.createElement("h5");
                $(cardTitle).addClass("card-title");
                cardBody.appendChild(cardTitle);
                cardTitle.innerHTML = data[j * 3 + i].name; 
                // house
                let cardSubTitle = document.createElement("h6");
                $(cardSubTitle).addClass("card-subtitle");
                cardBody.appendChild(cardSubTitle);
                cardSubTitle.innerHTML = data[j * 3 + i].house;
                // gender
                let gender_text = data[j * 3 + i].gender == "male" ? "Мужской" : "Женский";
                let genderElement = document.createElement("p");
                cardBody.appendChild(genderElement);
                genderElement.innerHTML = gender_text;
                // date-birth
                let dateElement = document.createElement("p");
                cardBody.appendChild(dateElement);
                if (data[j * 3 + i].dateOfBirth != null)
                {
                    let normilizeDate = data[j * 3 + i].dateOfBirth.replace(/-/gi, "."); // Заменяем все вхождения - на .
                    dateElement.innerHTML = normilizeDate;
                }
                else
                    dateElement.innerHTML = data[j * 3 + i].yearOfBirth;
                // wizard-or-not
                let pElement = document.createElement("p");
                if (data[j * 3 + i].wizard)
                {
                    pElement.style.color = "green";
                    pElement.style.fontWeight = "bolder";
                    pElement.innerHTML = "Волшебник";
                    $(card).addClass("text-bg-info");
                }
                else
                {
                    pElement.style.color = "brown";
                    pElement.style.fontWeight = "italic";
                    pElement.innerHTML = "Магл";
                    $(card).addClass("text-bg-secondary");
                }
                cardBody.appendChild(pElement);
                //eye
                if (typeof(data[j * 3 + i].eyeColour) != undefined && data[j * 3 + i].eyeColour != "")
                {
                    let eyeElement = document.createElement("p");
                    eyeElement.innerHTML = `Цвет глаз: ${DICT_COLOR[data[j * 3 + i].eyeColour]}`;
                    eyeElement.style.color = data[j * 3 + i].eyeColour;
                    eyeElement.style.textAlign = "center";
                    cardBody.appendChild(eyeElement);  
                }
                 //hair
                if (typeof(data[j * 3 + i].eyeColour) != undefined && data[j * 3 + i].hairColour != "")
                {
                    let hairElement = document.createElement("p");
                    hairElement.innerHTML = `Цвет волос: ${DICT_COLOR[data[j * 3 + i].hairColour]}`;
                    hairElement.style.color = data[j * 3 + i].hairColour;
                    hairElement.style.textAlign = "center";
                    cardBody.appendChild(hairElement);
                }
                // alt-names
                if (data[j * 3 + i].alternate_names != null && data[j * 3 + i].alternate_names.length != 0)
                {
                    let nameList = document.createElement("p");
                    nameList.innerHTML = "List alt name";
                    $(nameList).addClass("title_alt");
                    card.appendChild(nameList);
                    let listGroup = document.createElement("ul");
                    $(listGroup).addClass("list-group list-group-flush");
                    card.appendChild(listGroup);
                    // add li element equals how many alt name person have
                    for(let k = 0; k < data[j * 3 + i].alternate_names.length; k++)
                    {
                        let liElemet = document.createElement("li"); // Создаем элемент тега li
                        $(liElemet).addClass("list-group-item"); // Добавляем класс через jqery созданному элементу
                        liElemet.innerHTML = data[j * 3 + i].alternate_names[k]; // Наполняем контент текстом из API
                        listGroup.appendChild(liElemet); // Добавляем элемент как дочерней нашему ul-списку
                        if (data[j * 3 + i].wizard)  $(liElemet).addClass("text-bg-info");
                        else $(liElemet).addClass("text-bg-secondary");
                    }
                }
            }
        }
    });
}
