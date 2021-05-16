export interface DropInfo {
  address: string;
  r: string;
  s: string;
  v: number;
}

export const getDropInfo = (chainId: number): DropInfo[] => {
  if (chainId === 4) {
    return [
      {
        address: '0x8a333a18B924554D6e83EF9E9944DE6260f61D3B',
        r: '0x65328b49ba16a62a2219ab6b89c1c5c02062faea16e2e84ad28fa04e35d362c6',
        s: '0x4b8077977a91751b923841988c7d03f5b6071fdb8b7bc962f426bb348d1d2782',
        v: 27,
      },
      {
        address: '0x2F29Dd2166910c60b4899B6CD78191971Ac26C7C',
        r: '0xf5544e24232c4c9cd2553670ea4c46e8c6a72034eef9f0e442a18593bcebf2f4',
        s: '0x55e229663daa908480e6c6f3fb6d04fbefaed2718c6e8af56ce56a6cf62e3ab5',
        v: 27,
      },
      {
        address: '0xE0aD99015fAaB410BCBb647C929EADec50852f90',
        r: '0xc15244cf62443c0df6887c1da10f5af3a0215270f4e208766f527717f1e634dc',
        s: '0x74202fb96b8b2540f98f6cb841ba54dd5fd8ab541e6e323e42b7f8d6b54f0bb3',
        v: 28,
      },
      {
        address: '0xb3F193A55867AB7153c5731d667cebDF75C3f192',
        r: '0x27e69d09b324667d05a1951126dd411d49e5445d09d59532f71395be284c3f7d',
        s: '0x242fc25cffd428472d25653faa7d75f460ebba04fd5e561cf54fc8d16e3c18bd',
        v: 27,
      },
      {
        address: '0x7bAEC26d7183e744F2214E98651936AE2989dAF8',
        r: '0x722cc66a03e1d84f63e55dbfe5efdf4f056a6fd5eef8623ad7e14c4ee699446d',
        s: '0x0de542231fb256d78b44e9c657a8b9742cc287e95575d3efd5c1736b2656ed76',
        v: 27,
      },
      {
        address: '0x5409ED021D9299bf6814279A6A1411A7e866A631',
        r: '0xd4733438e791a47159b82f7f54a5bede50fe98cfab6c4da404b332e19d2b3e82',
        s: '0x7fe7d53b8b61e48e7ba09d3ef3219af59a7b95fcffe7caac8ce0c35db1c9c5cf',
        v: 27,
      },
    ];
  }

  if (chainId === 1) {
    return [
      {
        address: '0x81e5cd19323ce7f6b36c9511fbc98d477a188b13',
        r: '0xa63d9d6d67501c394c5093c0fe8cec55a8790bc047d5758b9c82f389af3c8967',
        s: '0x0823c9ef0b4c9e6aa7e8622c902cd25ed0a570aa32901b9e37dacbf24806678e',
        v: 27,
      },
      {
        address: '0x844e2fd3b16dc5edb211cc758b2f88236ce12ba7',
        r: '0x6d366abf06e30b226606d24cf8746f91f61d7f6dd2be35a739ee769a30bceb45',
        s: '0x1ac85eeae05df49337bbba4b5daa3a1b4115c828b4eb826f77578c157bb801eb',
        v: 27,
      },
      {
        address: '0x32436911a444c4c66b1799e8687f84c32ab71ae2',
        r: '0xa21641f5aeccf26ee78317fd1215c3565e8c36b4598b4757e6273fe779cdd799',
        s: '0x1a47c69ed1a57ed2090cfd1ac6036f14b378844d8b435e66eaea7ca9e04d8e64',
        v: 28,
      },
      {
        address: '0x42147a90b2e2db8c59f0a60c27385cd96fe2ec9c',
        r: '0x83e1ce0c35f500302840017910a50c5298d7030bc542a0f8e3a03ae1eebf0697',
        s: '0x62134bdb00c2df9f04316e3304b2a377f8792d74e207d9f7984b43ae0b4dc035',
        v: 27,
      },
      {
        address: '0x69df7dd293eeff309d8fa12126be3f5d2eb277e2',
        r: '0xf0d30e6a54e65574f10cf559ed48a405b049388f861c30ac2a8c42ae83045b9e',
        s: '0x6a1907237c065cad1c469eb0abb96ca261a8741be79165150cb1f109d14e52a9',
        v: 28,
      },
      {
        address: '0x8a333a18b924554d6e83ef9e9944de6260f61d3b',
        r: '0x689867a70acf8b4325a9bc02e54226e845faefd66356dc4211d449fba69870c2',
        s: '0x48e3ed43e43f43543d55e5c99142912f5470a1207ce7653323730da2a8407604',
        v: 28,
      },
      {
        address: '0xadc6febfdedd734da93fb4437a10a0135dce3ca5',
        r: '0x5d72bd91f9a5d8ff33f6f12468899c0b1880c3bb63a72eb251e1825ef889a79b',
        s: '0x198bf90923985733b70f3324fa53d282dc9d25a88d21742e5f5a0ebce759aada',
        v: 28,
      },
      {
        address: '0x184c0070d76e502d76e6783cc33cf22788b75726',
        r: '0x7e0a621b7956fd0716a570057c44f7fbef7efdce42865a13b520577422fae984',
        s: '0x6b38f9904263c3b11a0486454460549e4c161e1349668d23e2e5caef2a358003',
        v: 28,
      },
      {
        address: '0x8b3f63d1e3b8ff3ac28e0d4ab4674fe7eaac2860',
        r: '0x5aef4c132f9adf770aa1534e2cc5887920a55494d0626d1a12a3f99c2acb9800',
        s: '0x20133dd9537cf1766bec9fea0b19adb4022579b3901d01082497b024e4fabb36',
        v: 28,
      },
      {
        address: '0x7c4f9b114c6d0b877a82438e67fa8799e343fa6c',
        r: '0x725b8aed172b900d0bb1173c2fe2ed3c00588c9465837d3d9e5ccd888b75205b',
        s: '0x231f10b9795d3e06aa989a7927d25f4b150fb15fffb9f9b99ea959327276a775',
        v: 27,
      },
      {
        address: '0x4623059b1f634fda728027013cb90738523458d1',
        r: '0x827c5a60a13b03a49da8793c9beeabd28bab47687103302a4ce98d2cb90c9624',
        s: '0x2bfe8690d15227073edbb9d411a1224889c7fce866e4f960a0c23b9244058ada',
        v: 28,
      },
      {
        address: '0x2621ea417659ad69bae66af05ebe5788e533e5e7',
        r: '0xde1f28cdb0d30569e11db7f6cc87a93949b200355b27e63f0777ab22e152f11c',
        s: '0x0d168a3d70318c3df8fdf8f4f9ca4623c08c38a642934f3d5b635613e9838efe',
        v: 28,
      },
      {
        address: '0xfad0ea578c6c63fe495dc0ef9cf73fc2c69e1f47',
        r: '0x85de997ddd9be4cc219634b7da2c7762d0bcf5bc59d4df6c132fe63bf5012ca3',
        s: '0x0d233cfa93bfa2c97273e16ad79f0c647be37d6718e40f8b09b890a9073714f5',
        v: 28,
      },
      {
        address: '0x2150b9c1ac1ab6ef3a05ef89e042feec63a44085',
        r: '0x8c777c0bbb5f4308eb0ae1b835881d9f09b39d95f674d711f9061901e0931ce7',
        s: '0x02cac4a7e42ff137b5a5f49a39c9b139473776108f707c1fe525b08f6260fd1c',
        v: 28,
      },
      {
        address: '0x2c897c7f4b3b6a4664c46672b31189b7a0316e26',
        r: '0xd51d95028990b579b919a41895ec4a2c231a53b026a332709c90e9ca71471542',
        s: '0x71d82c4db2d0307ee9224db7d315ccdb42e3dc6bbd90d8099f5a8c1b96161a26',
        v: 28,
      },
      {
        address: '0xbdbfa6b8780e17c2fe546c28f4607fc17160236e',
        r: '0x8942405da08ddef0faa4eaa6fc1b71239c442ffc52969948de2aaadfac3324e4',
        s: '0x3e758f000ddc35785a17c4146f0d7a8688ae614607bc90215b3c4e49b92e81ee',
        v: 28,
      },
      {
        address: '0x0e8bc96978cae445128e55f2a437b9551863c1a3',
        r: '0x9e4900b884d40ffd27fdcc702b2005ff4907f785d8f79025d7d19b0a78f6c7ad',
        s: '0x1c74bb2bb8becffa374095a5a4e4d450447450e1baff4baacc262fa62a8b0360',
        v: 28,
      },
      {
        address: '0xaed74bce7c07494ea84f81272a31ff55913c685a',
        r: '0xbe8a156e2c4c6eca6f1a82b20919925dd5364f39551408c49832ba21cf0ebd10',
        s: '0x506bf9d0ec819bdc1e783fa0fd1b74fd7d86facd4cc62f8ab948dc1d76210470',
        v: 27,
      },
      {
        address: '0xbd9b7373aac15d9a93c810df3999343f4fe1ed88',
        r: '0x126a5607835d65275ebe2577b6aafe5bc42c23201be6f4f28da73edc094d82cb',
        s: '0x247357d73d51ea845860a9f31235dbc8a9d0b985bcfbca869bca9be28c44a5d3',
        v: 27,
      },
      {
        address: '0xee0b2d0d0ba51f83283f078b69f74e3e6c2f0564',
        r: '0xe52cbb57637944f11cb8af6dcbfb7a745e39641b07b2783164aacf9236b80a87',
        s: '0x6c74154c50d2fdf5b80a6b186fad520bbde58082d47107fb275a82b0b322df92',
        v: 27,
      },
      {
        address: '0x3deaf8134c9aebf84e9c8870c4ac1dcdb5e37e15',
        r: '0xbf7ebde809a65bb01be5c128a38a8f9f35a0f36042028e760d0382f07543ad7a',
        s: '0x0fd68eba4845caf34ddaaa41d9621e07f0afd951ab6b62a927203f11391d6be1',
        v: 27,
      },
      {
        address: '0x08cf1208e638a5a3623be58d600e35c6199baa9c',
        r: '0x0765fe51ed20f90d4a4e97e456524e630f73e4a75ac96a9c353911d62158c187',
        s: '0x44ecc57d00e0ee2d1291eb29be3ce096a3998900d29f379b622273c321837e77',
        v: 28,
      },
      {
        address: '0x7b511800a8d8e7de24dd19de3103081824b6f41d',
        r: '0x06afc7bb7202de00c9aaea89b364dfe937f45de45c51cd3ed492e2a5c32f13ed',
        s: '0x2f3c0548ee290fa77fc86b346c63ab862cbf4a04e136afbc329fe3b468aa3d02',
        v: 27,
      },
      {
        address: '0x45e3fdc403a35cdfad67ab07c1138e69696521bf',
        r: '0x4e279cd6d20f3a510f9c1be2f1b26e3bacf8bf5d9eda77b0744e2bdb6be1977c',
        s: '0x03d1a795df633b1794243f574d645256a350f6931e22f2581a69f9bcc0bb7481',
        v: 27,
      },
      {
        address: '0xe173e8feef31aa143218810087ff6a1a8166e537',
        r: '0x9f404c52ac150f3ef3cd6b7f33bb65091adfc1bc9b2b6d2beda0b4bd7e3bf194',
        s: '0x1d480566e8e2df252424076a0cf6371bd4c52e0bae8c353fb7650cbbcc104ce5',
        v: 27,
      },
      {
        address: '0x93f7beafa6a0cd73b387f027c9c14f47dc192822',
        r: '0x8f7ad202d4361b1a21d0b5c5822a2968ee4f1604507ef42b32c15b3d51a51bb8',
        s: '0x47eb51edf723f46ce2ecdb76f3a8dac03cee85a4ab7baa87efddd22002d7f7a6',
        v: 27,
      },
      {
        address: '0x2f33f5de63e8b0c6a539e5c51c334ce51a96f9f9',
        r: '0xf0447f0bab4ce6eda6c546a0340e3b7995aea701711fef4533fc03c76454c4e6',
        s: '0x0257106c77a7e51d30094d42fda74c44f93e8d1ce47ebc073da0b48438db8051',
        v: 28,
      },
      {
        address: '0xf83dcc7c68fb3d40049935096594288641eadcea',
        r: '0x9ac9405447759d12716e28c55f9cd46b4463b49adc4369dfb38e6c0494504633',
        s: '0x3f49040343dfca17889a0ca4e209f4de096ca863035f14433c8b5c32980d204f',
        v: 27,
      },
      {
        address: '0xdebc094993a95b467691be9fe9d94368ede41c02',
        r: '0x66d1785b0a5026b2d5042fc1a876cef450cec517d2e398de29f6c3ca731e5fed',
        s: '0x255c7de1b1919df077eaf292244dfed6abbd9956b9de4f622e0cc0285d25911c',
        v: 27,
      },
      {
        address: '0x79d6f94e57943b4d46eab7df7aa012dff1ecf18f',
        r: '0x10ae05893bfce800c483fdb144159f626c9b88502ae4f3d996e6cefdeac9377b',
        s: '0x50d072472bad4f4361b7fbad24be8aec0af046467733d79a10efd37875a35c0a',
        v: 27,
      },
      {
        address: '0xd17b35741a8082d6cf9b1eae5dfc4c259657b19a',
        r: '0x3542b4335e2144a9292b697f64d086a63de919b350204048260983dc7e1e784b',
        s: '0x7f91d7c501a5cd29d48a0cb7e81b4e79002d855627d6d4179cef2680db419712',
        v: 27,
      },
      {
        address: '0xee5c256721abe58af6f582c0efd6774dd2765038',
        r: '0x825590f7489168d7987786f56db5dd38d9983e03ca07814e389b73ce926daeda',
        s: '0x6ce329d3718d86fe53f616cfa8c103b5b06973e6541437cfada12ded35346f4a',
        v: 28,
      },
      {
        address: '0x865c2f85c9fea1c6ac7f53de07554d68cb92ed88',
        r: '0x7378f3fe6e6859e8c47d81459669e7084886e2fbf21a66d105a2e81903d9185a',
        s: '0x1cfc54cbdf42a184c6dfc737b50a0312f38ffda62c218dfede21c94af6751886',
        v: 27,
      },
      {
        address: '0x997aff12f28b97fd2bdd99fc186190eaaeebd4b1',
        r: '0x360df2e0c09bc47dd6eeeec0488c1dd57ea04639f6474d87d3316bde0fecbd6d',
        s: '0x358bfbec8ae78f73864c15cf03917fc86f21ad8ebd208429d8255897a89a958b',
        v: 27,
      },
      {
        address: '0xd93e1404d732cfea9f7d863c92efe4e408857b7a',
        r: '0xaa7fb94ab9f4384249c38923a3e86bb13dce62d9ea077ea2f02b1341b2df8998',
        s: '0x6d33c730d1eee1f4f4ab1443341e85ff98442b4c03f5448fafea42f2858b652b',
        v: 28,
      },
      {
        address: '0xcc5ddc8ccd5b1e90bc42f998ec864ead0090a12b',
        r: '0x5713db06f00d1d7387e11abb4928cd40d631f95993e48fd7ba3e25e0cce06922',
        s: '0x432da04e05a1eb7ca71f7d51f2b20afd5f9517221a1b9570b0d2410c81783736',
        v: 27,
      },
      {
        address: '0xb9c5747e56277def127678def8cf2308badb948b',
        r: '0xd12267a9f9ef92efb414b892e8cfd1e5756d089a2f2656d9f9f74f04eb26ae7c',
        s: '0x754740c7e3718516ecaba7541099a99e238d1335f5d6aca23a4aa0826f0dd80b',
        v: 28,
      },
      {
        address: '0x9f7064dfe6ca5856b3afd7a3b3974686a35bdab5',
        r: '0x117515c910d20d35d250ebf69e7227cf9b89a05c57aef1324bdd1aa39f8bf9b9',
        s: '0x1ae9c2dcf1c2e64756a2b260879d215af12b79b76dd2facf604fb6e32d59f937',
        v: 28,
      },
      {
        address: '0x544e2df1ead3cdde014669f382d5bd0535567158',
        r: '0xd3cf557f95ee631051ad32ff9a9409a9496060747cee6bdb0688d7f8f185d433',
        s: '0x183600076c1c9193532dada9b2d783ccbd1b7e9995442b7030252c024b25a50f',
        v: 27,
      },
      {
        address: '0x94ca273b9e9224dce8a51cf243e8db7ef0005f22',
        r: '0x64e59bb15338f41d45010fd1d92d51853b699dc0e99daf10909c3375c0209fd3',
        s: '0x3974ee0c5a4a1cd9bc44ed1f7ecae52d9a4cc411558ca993ccf677c110eccadc',
        v: 27,
      },
      {
        address: '0xb3589bbd2781aad79cc2727fd5abb762b522a7a2',
        r: '0xd90dffe645b0910e2d4be285a3776052373f7685775848522dc1c3a9cf8b2821',
        s: '0x2efc08d557345af98caea9022ebf2a0de0ef20f8a9306a651c6ccbba9a0651e6',
        v: 28,
      },
      {
        address: '0xcab17f9bbae2101c04c59ae4f9bcb0b3a2bd796d',
        r: '0xad920a0a7f569aeaa259166048b51d62a3db98eef98016601f66c3320461e756',
        s: '0x6861ae5b2dea2234f248a08a53d8c0913da44fe85af7053fd0008e92bbac0729',
        v: 28,
      },
      {
        address: '0x48917cf4498f8835df24c9b1afb61c218b486d6c',
        r: '0x827c4e550eb6a4601c78a94a73d3ec99cdccafc72a7cec8cf11feaa541fa8c49',
        s: '0x44ea2934b101fdb69cc1f89964b4e204040baa470e6017a43d4b21c34e0a532e',
        v: 27,
      },
      {
        address: '0xa0f939965e18e969ddabab056e81dae2e2e7df4d',
        r: '0x0046056402d2113be2ca549921f88dabbb28a8229b485ae2f3c2df95b78c7da4',
        s: '0x66b1c25c07a95df154789319552872877b345663ef76bea36f741725ef0a2e27',
        v: 28,
      },
      {
        address: '0x565b93a15d38acd79c120b15432d21e21ed274d6',
        r: '0x278e37b58887107b6c162873ae474ec4439eba23cdaa0f073d546806352e7e1a',
        s: '0x1cd947bdcb04af15e692d8e15fd70483ba4c4d3e175d4b1c750c59b73f0fbc99',
        v: 28,
      },
      {
        address: '0x439001e00378ee142489f56c04895fac01dc0bb5',
        r: '0xaa14ac6bfcfe63ac547aef1bd4213c05f5119230aa0728ccf988db52640a03ef',
        s: '0x06056db878ab601e41d84e1ae7b7b8a411bd37ba70b5189c67bfc5f066d0367c',
        v: 27,
      },
      {
        address: '0x11ededebf63bef0ea2d2d071bdf88f71543ec6fb',
        r: '0xdbaa3b0ef24032ace8d6f34c8dbeff02791a323d3057053845c2f36e0a166d55',
        s: '0x3b4215f294d4348af4a792d9dab82fc24ca008cbebaa4f641afb7c7d183e6b61',
        v: 28,
      },
      {
        address: '0x422af24a3e8fec634e78ae575971af3c0048092e',
        r: '0x42672f6de8821411a8fdc2ce70ea438c02df19d28467525ffad296c8eb4a6896',
        s: '0x5ce9cf9576654f0e0d206130a74611a4e60b60459d49b2a2925d1d9711d263fd',
        v: 28,
      },
      {
        address: '0xe33c8e3a0d14a81f0dd7e174830089e82f65fc85',
        r: '0xadc8a703eeed5550457db92fa43d621ea3da353f81f40318fd74ceaac002bd7d',
        s: '0x491986553a9c9c2f300518a4e1e61b49f33b40603091f4127f68246987bf802c',
        v: 28,
      },
      {
        address: '0x22d8333eb47b96d8e9530bccc467a1f99281489f',
        r: '0x0a3a5fb841ae02517a0d55319720af505bfee9780b9dfaeffec0423f2528736d',
        s: '0x34519ba2c335585df736126d6c112c9500afec3bf6aa523317110aa45628f6e9',
        v: 28,
      },
    ];
  }

  throw new Error(`Unexpected chainID: ${chainId} for drop recipients`);
};

export type DropInfoResponse =
  | { found: false }
  | { found: true; dropInfo: DropInfo };
export const getDropInfoForAddress = (
  address: string,
  chainId: number,
): DropInfoResponse => {
  const allDropInfo = getDropInfo(chainId);

  const foundItem = allDropInfo.find((d) => {
    return d.address.toLowerCase() == address.toLowerCase();
  });
  if (foundItem) {
    return { found: true, dropInfo: foundItem };
  } else {
    return { found: false };
  }
};
