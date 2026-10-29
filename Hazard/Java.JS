function getDropChances(caseData) {

    const list = skins.map(item => ({
        ...item
    }));

    /*
        Te same modyfikatory co przy
        faktycznym losowaniu.
    */

    list.forEach(item => {

        if (item.rarity === "rare") {
            item.chance *= caseData.multiplier;
        }

        if (item.rarity === "epic") {
            item.chance *= caseData.multiplier;
        }

        if (item.rarity === "legendary") {
            item.chance *= caseData.multiplier * 1.2;
        }

    });

    const total = list.reduce(
        (sum, item) => sum + item.chance,
        0
    );

    return list.map(item => ({
        ...item,
        percent:
            (item.chance / total) * 100
    }));
}


function showDrops(type) {

    const caseData = cases[type];

    const drops =
        getDropChances(caseData);

    document.getElementById(
        "dropTitle"
    ).textContent =
        "🎁 " + caseData.name + " — Drop";


    const list =
        document.getElementById(
            "dropList"
        );

    list.innerHTML = "";


    drops
        .sort((a,b) => b.percent - a.percent)
        .forEach(item => {

            const row =
                document.createElement("div");

            row.className =
                "dropItem";


            const percentage =
                item.percent.toFixed(2);


            row.innerHTML = `

                <div class="dropIcon">
                    ${item.icon}
                </div>

                <div>

                    <div class="dropName">
                        ${item.name}
                    </div>

                    <div class="dropRarity ${item.rarity}">
                        ${item.rarity.toUpperCase()}
                    </div>

                    <div class="chanceBar">
                        <div
                            class="chanceFill"
                            style="width:${Math.min(
                                item.percent,
                                100
                            )}%">
                        </div>
                    </div>

                </div>

                <div class="dropChance">
                    ${percentage}%
                </div>

            `;

            list.appendChild(row);

        });


    document.getElementById(
        "dropModal"
    ).style.display = "flex";
}


function closeDrops() {

    document.getElementById(
        "dropModal"
    ).style.display = "none";
}
