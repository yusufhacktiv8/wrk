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

  return result;
};
