export default (forms) => {
  const result = {
    kontrakDihadapi: {
      pesananTahunLalu: {
        extern: {},
        jo: {},
        intern: {},
      },
      pesananBaru: {
        extern: {},
        jo: {},
        intern: {},
      },
    },
    penjualan: {
      pesananTahunLalu: {
        extern: {},
        jo: {},
        intern: {},
      },
      pesananBaru: {
        extern: {},
        jo: {},
        intern: {},
      },
    },
    labaKotor: {
      pesananTahunLalu: {
        extern: {},
        jo: {},
        intern: {},
      },
      pesananBaru: {
        extern: {},
        jo: {},
        intern: {},
      },
    },
    biayaUsaha: {},
    bunga: {},
    labaRugiLain: {},
  };

  const values1 = forms.contractForm1;
  result.kontrakDihadapi.pesananTahunLalu.extern = {
    rkap: values1.rkap1,
    ra: values1.ra1,
    ri: values1.ri1,
    prognosa: values1.prognosa1,
  };
  result.kontrakDihadapi.pesananTahunLalu.jo = {
    rkap: values1.rkap2,
    ra: values1.ra2,
    ri: values1.ri2,
    prognosa: values1.prognosa2,
  };
  result.kontrakDihadapi.pesananTahunLalu.intern = {
    rkap: values1.rkap3,
    ra: values1.ra3,
    ri: values1.ri3,
    prognosa: values1.prognosa3,
  };

  const values2 = forms.contractForm2;
  result.kontrakDihadapi.pesananBaru.extern = {
    rkap: values2.rkap1,
    ra: values2.ra1,
    ri: values2.ri1,
    prognosa: values2.prognosa1,
  };
  result.kontrakDihadapi.pesananBaru.jo = {
    rkap: values2.rkap2,
    ra: values2.ra2,
    ri: values2.ri2,
    prognosa: values2.prognosa2,
  };
  result.kontrakDihadapi.pesananBaru.intern = {
    rkap: values2.rkap3,
    ra: values2.ra3,
    ri: values2.ri3,
    prognosa: values2.prognosa3,
  };

  const values3 = forms.contractForm3;
  result.penjualan.pesananTahunLalu.extern = {
    rkap: values3.rkap1,
    ra: values3.ra1,
    ri: values3.ri1,
    prognosa: values3.prognosa1,
  };
  result.penjualan.pesananTahunLalu.jo = {
    rkap: values3.rkap2,
    ra: values3.ra2,
    ri: values3.ri2,
    prognosa: values3.prognosa2,
  };
  result.penjualan.pesananTahunLalu.intern = {
    rkap: values3.rkap3,
    ra: values3.ra3,
    ri: values3.ri3,
    prognosa: values3.prognosa3,
  };

  const values4 = forms.contractForm4;
  result.penjualan.pesananBaru.extern = {
    rkap: values4.rkap1,
    ra: values4.ra1,
    ri: values4.ri1,
    prognosa: values4.prognosa1,
  };
  result.penjualan.pesananBaru.jo = {
    rkap: values4.rkap2,
    ra: values4.ra2,
    ri: values4.ri2,
    prognosa: values4.prognosa2,
  };
  result.penjualan.pesananBaru.intern = {
    rkap: values4.rkap3,
    ra: values4.ra3,
    ri: values4.ri3,
    prognosa: values4.prognosa3,
  };

  const values5 = forms.contractForm5;
  result.labaKotor.pesananTahunLalu.extern = {
    rkap: values5.rkap1,
    ra: values5.ra1,
    ri: values5.ri1,
    prognosa: values5.prognosa1,
  };
  result.labaKotor.pesananTahunLalu.jo = {
    rkap: values5.rkap2,
    ra: values5.ra2,
    ri: values5.ri2,
    prognosa: values5.prognosa2,
  };
  result.labaKotor.pesananTahunLalu.intern = {
    rkap: values5.rkap3,
    ra: values5.ra3,
    ri: values5.ri3,
    prognosa: values5.prognosa3,
  };

  const values6 = forms.contractForm6;
  result.labaKotor.pesananBaru.extern = {
    rkap: values6.rkap1,
    ra: values6.ra1,
    ri: values6.ri1,
    prognosa: values6.prognosa1,
  };
  result.labaKotor.pesananBaru.jo = {
    rkap: values6.rkap2,
    ra: values6.ra2,
    ri: values6.ri2,
    prognosa: values6.prognosa2,
  };
  result.labaKotor.pesananBaru.intern = {
    rkap: values6.rkap3,
    ra: values6.ra3,
    ri: values6.ri3,
    prognosa: values6.prognosa3,
  };

  const simpleValues1 = forms.simpleForm1;
  result.biayaUsaha = {
    rkap: simpleValues1.rkap,
    ra: simpleValues1.ra,
    ri: simpleValues1.ri,
    prognosa: simpleValues1.prognosa,
  };

  const simpleValues2 = forms.simpleForm2;
  result.bunga = {
    rkap: simpleValues2.rkap,
    ra: simpleValues2.ra,
    ri: simpleValues2.ri,
    prognosa: simpleValues2.prognosa,
  };

  const simpleValues3 = forms.simpleForm3;
  result.labaRugiLain = {
    rkap: simpleValues3.rkap,
    ra: simpleValues3.ra,
    ri: simpleValues3.ri,
    prognosa: simpleValues3.prognosa,
  };

  return result;
};
